// Environment Variable Validation
// Ensures all required environment variables are set

const requiredEnvVars = {
  // Production required
  JWT_SECRET: {
    required: true,
    minLength: 32,
    description: 'Secret key for JWT signing (min 32 characters)'
  },
  
  // Development/Production
  NODE_ENV: {
    required: false,
    default: 'development',
    validValues: ['development', 'production', 'test', 'staging']
  },
  
  PORT: {
    required: false,
    default: '5000',
    validator: (val) => !isNaN(parseInt(val)) && parseInt(val) > 0
  },
  
  GEMINI_API_KEY: {
    required: false, // Optional - AI features won't work without it
    description: 'Google Gemini API key for AI features'
  },
  
  CORS_ORIGINS: {
    required: false,
    default: 'http://localhost:3000,http://localhost:5173'
  }
};

/**
 * Validate environment variables
 * @returns {Object} { valid: boolean, errors: string[], warnings: string[] }
 */
function validateEnvVars() {
  const result = {
    valid: true,
    errors: [],
    warnings: []
  };
  
  for (const [key, config] of Object.entries(requiredEnvVars)) {
    const value = process.env[key];
    
    // Check if required
    if (config.required && !value) {
      result.valid = false;
      result.errors.push(`❌ ${key} is required but not set. ${config.description || ''}`);
      continue;
    }
    
    // Use default if not set and default exists
    if (!value && config.default) {
      process.env[key] = config.default;
      continue;
    }
    
    if (value) {
      // Check min length
      if (config.minLength && value.length < config.minLength) {
        result.errors.push(
          `❌ ${key} must be at least ${config.minLength} characters, got ${value.length}`
        );
        result.valid = false;
      }
      
      // Check valid values
      if (config.validValues && !config.validValues.includes(value)) {
        result.warnings.push(
          `⚠️ ${key} should be one of: ${config.validValues.join(', ')}, got: ${value}`
        );
      }
      
      // Custom validator
      if (config.validator && !config.validator(value)) {
        result.errors.push(`❌ ${key} failed validation`);
        result.valid = false;
      }
    }
  }
  
  // Additional checks for production
  if (process.env.NODE_ENV === 'production') {
    if (process.env.JWT_SECRET === 'your_default_secret_key') {
      result.errors.push(
        '❌ JWT_SECRET cannot be the default value in production!'
      );
      result.valid = false;
    }
    
    if (!process.env.GEMINI_API_KEY) {
      result.warnings.push(
        '⚠️ GEMINI_API_KEY not set - AI features will be disabled'
      );
    }
  }
  
  return result;
}

/**
 * Print validation results to console
 * @returns {Object} validation result
 */
function printEnvValidation() {
  const result = validateEnvVars();
  
  console.log('\n🔍 Environment Variable Validation');
  console.log('==================================');
  
  if (result.errors.length > 0) {
    console.log('\n❌ ERRORS:');
    result.errors.forEach(err => console.log(err));
  }
  
  if (result.warnings.length > 0) {
    console.log('\n⚠️ WARNINGS:');
    result.warnings.forEach(warn => console.log(warn));
  }
  
  if (result.valid) {
    console.log('\n✅ All environment variables are valid!');
  }
  
  console.log('\n');
  
  return result;
}

module.exports = {
  validateEnvVars,
  printEnvValidation
};

