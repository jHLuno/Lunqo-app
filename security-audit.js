#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Security audit configuration
const auditConfig = {
  // Files to check for security issues
  filesToCheck: [
    'server.js',
    'routes/*.js',
    'models/*.js',
    'middleware/*.js',
    'public/*.html',
    'src/**/*.js',
    'src/**/*.jsx',
  ],
  
  // Patterns to check for
  patterns: {
    // Dangerous patterns
    dangerous: [
      /eval\s*\(/gi,
      /innerHTML\s*=/gi,
      /document\.write/gi,
      /setTimeout\s*\(\s*['"`][^'"`]*['"`]/gi,
      /setInterval\s*\(\s*['"`][^'"`]*['"`]/gi,
    ],
    
    // Plain text passwords
    plainTextPasswords: [
      /password\s*:\s*['"`][^'"`]*['"`]/gi,
      /password\s*=\s*['"`][^'"`]*['"`]/gi,
    ],
    
    // Hardcoded secrets
    hardcodedSecrets: [
      /secret\s*:\s*['"`][^'"`]*['"`]/gi,
      /key\s*:\s*['"`][^'"`]*['"`]/gi,
      /token\s*:\s*['"`][^'"`]*['"`]/gi,
    ],
    
    // Console logs in production
    consoleLogs: [
      /console\.log/gi,
      /console\.error/gi,
      /console\.warn/gi,
      /console\.info/gi,
    ],
    
    // SQL injection patterns
    sqlInjection: [
      /SELECT.*\+.*req\./gi,
      /INSERT.*\+.*req\./gi,
      /UPDATE.*\+.*req\./gi,
      /DELETE.*\+.*req\./gi,
    ],
    
    // XSS patterns
    xss: [
      /innerHTML\s*=\s*.*req\./gi,
      /document\.write.*req\./gi,
      /eval.*req\./gi,
    ],
  },
  
  // Exclude patterns
  excludePatterns: [
    /node_modules/,
    /\.git/,
    /\.env/,
    /package-lock\.json/,
    /yarn\.lock/,
  ],
};

// Utility functions
const utils = {
  // Get all files matching patterns
  getFiles: (patterns) => {
    const files = [];
    
    const walkDir = (dir) => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // Check if directory should be excluded
          const shouldExclude = auditConfig.excludePatterns.some(pattern => 
            pattern.test(fullPath)
          );
          
          if (!shouldExclude) {
            walkDir(fullPath);
          }
        } else if (stat.isFile()) {
          // Check if file matches any pattern
          const matchesPattern = patterns.some(pattern => {
            if (typeof pattern === 'string') {
              return fullPath.includes(pattern);
            } else if (pattern instanceof RegExp) {
              return pattern.test(fullPath);
            }
            return false;
          });
          
          if (matchesPattern) {
            files.push(fullPath);
          }
        }
      }
    };
    
    walkDir('.');
    return files;
  },
  
  // Check file for security issues
  checkFile: (filePath) => {
    const issues = [];
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      // Check each pattern
      Object.entries(auditConfig.patterns).forEach(([category, patterns]) => {
        patterns.forEach(pattern => {
          const matches = content.match(pattern);
          if (matches) {
            matches.forEach(match => {
              const lineNumber = lines.findIndex(line => line.includes(match)) + 1;
              issues.push({
                category,
                pattern: pattern.toString(),
                match: match.substring(0, 100) + (match.length > 100 ? '...' : ''),
                line: lineNumber,
                severity: getSeverity(category),
              });
            });
          }
        });
      });
      
    } catch (error) {
      issues.push({
        category: 'ERROR',
        pattern: 'File read error',
        match: error.message,
        line: 0,
        severity: 'HIGH',
      });
    }
    
    return issues;
  },
  
  // Generate secure random string
  generateSecureSecret: (length = 64) => {
    return crypto.randomBytes(length).toString('hex');
  },
  
  // Check if JWT secret is secure
  checkJWTSecret: () => {
    const envPath = '.env';
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const jwtSecretMatch = content.match(/JWT_SECRET=(.+)/);
      
      if (jwtSecretMatch) {
        const secret = jwtSecretMatch[1];
        if (secret.includes('your_super_secret') || secret.length < 32) {
          return {
            issue: 'Weak JWT secret detected',
            recommendation: `Generate a secure secret: ${utils.generateSecureSecret()}`,
            severity: 'CRITICAL',
          };
        }
      }
    }
    return null;
  },
};

// Helper function to determine severity
function getSeverity(category) {
  const severityMap = {
    dangerous: 'CRITICAL',
    plainTextPasswords: 'CRITICAL',
    hardcodedSecrets: 'HIGH',
    consoleLogs: 'MEDIUM',
    sqlInjection: 'CRITICAL',
    xss: 'HIGH',
  };
  
  return severityMap[category] || 'MEDIUM';
}

// Main audit function
async function runSecurityAudit() {
  console.log('🔒 Starting security audit...\n');
  
  const results = {
    filesChecked: 0,
    issuesFound: 0,
    criticalIssues: 0,
    highIssues: 0,
    mediumIssues: 0,
    lowIssues: 0,
    issues: [],
  };
  
  // Get all files to check
  const files = utils.getFiles(auditConfig.filesToCheck);
  results.filesChecked = files.length;
  
  console.log(`📁 Checking ${files.length} files...\n`);
  
  // Check each file
  files.forEach(filePath => {
    const issues = utils.checkFile(filePath);
    
    if (issues.length > 0) {
      results.issues.push({
        file: filePath,
        issues: issues,
      });
      
      issues.forEach(issue => {
        results.issuesFound++;
        
        switch (issue.severity) {
          case 'CRITICAL':
            results.criticalIssues++;
            break;
          case 'HIGH':
            results.highIssues++;
            break;
          case 'MEDIUM':
            results.mediumIssues++;
            break;
          case 'LOW':
            results.lowIssues++;
            break;
        }
      });
    }
  });
  
  // Check JWT secret
  const jwtIssue = utils.checkJWTSecret();
  if (jwtIssue) {
    results.issuesFound++;
    results.criticalIssues++;
    results.issues.push({
      file: '.env',
      issues: [jwtIssue],
    });
  }
  
  // Print results
  console.log('📊 Security Audit Results:\n');
  console.log(`Files checked: ${results.filesChecked}`);
  console.log(`Total issues found: ${results.issuesFound}`);
  console.log(`Critical issues: ${results.criticalIssues}`);
  console.log(`High issues: ${results.highIssues}`);
  console.log(`Medium issues: ${results.mediumIssues}`);
  console.log(`Low issues: ${results.lowIssues}\n`);
  
  // Print detailed issues
  if (results.issues.length > 0) {
    console.log('🚨 Issues Found:\n');
    
    results.issues.forEach(fileResult => {
      console.log(`📄 ${fileResult.file}:`);
      
      fileResult.issues.forEach(issue => {
        const severityIcon = {
          'CRITICAL': '🔴',
          'HIGH': '🟠',
          'MEDIUM': '🟡',
          'LOW': '🟢',
        }[issue.severity] || '⚪';
        
        console.log(`  ${severityIcon} [${issue.severity}] ${issue.category}`);
        console.log(`     Line ${issue.line}: ${issue.match}`);
        console.log('');
      });
    });
  } else {
    console.log('✅ No security issues found!');
  }
  
  // Print recommendations
  if (results.criticalIssues > 0 || results.highIssues > 0) {
    console.log('💡 Recommendations:');
    console.log('1. Fix all CRITICAL and HIGH severity issues immediately');
    console.log('2. Review and fix MEDIUM severity issues');
    console.log('3. Consider implementing automated security scanning');
    console.log('4. Update dependencies regularly');
    console.log('5. Use environment variables for all secrets');
  }
  
  // Exit with appropriate code
  if (results.criticalIssues > 0) {
    console.log('\n❌ Security audit failed - CRITICAL issues found');
    process.exit(1);
  } else if (results.highIssues > 0) {
    console.log('\n⚠️  Security audit warning - HIGH issues found');
    process.exit(2);
  } else {
    console.log('\n✅ Security audit passed');
    process.exit(0);
  }
}

// Run the audit
if (require.main === module) {
  runSecurityAudit().catch(error => {
    console.error('❌ Security audit failed:', error);
    process.exit(1);
  });
}

module.exports = {
  runSecurityAudit,
  utils,
  auditConfig,
}; 