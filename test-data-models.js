const { validateNewsStory, validateNewsPerspective, isValidPerspectiveType, validateContentQuality } = require('./utils/news/validation.js');

// Test data
const mockPerspective = {
  summary: 'This is a comprehensive test summary that provides detailed information about the news story from a specific perspective, ensuring it meets the minimum length requirements for validation.',
  keyPoints: ['Key point 1 about the story', 'Key point 2 with important details', 'Key point 3 summarizing impact'],
  angle: 'Test perspective angle',
  source: 'Test News Source',
  credibilityScore: 0.85,
  wordCount: 45,
};

const mockEngagementMetrics = {
  views: 1500,
  shares: 75,
  averageTimeSpent: 32,
  perspectiveSwitches: 12,
  bookmarks: 8,
};

const mockNewsStory = {
  id: 'test-story-123',
  headline: 'Breaking: Major Political Development Affects National Policy',
  category: 'politics',
  publishedAt: new Date('2024-01-15T10:30:00Z'),
  imageUrl: 'https://example.com/news-image.jpg',
  videoUrl: 'https://example.com/news-video.mp4',
  readTime: 35,
  perspectives: {
    neutral: { ...mockPerspective, angle: 'Neutral reporting angle' },
    liberal: { ...mockPerspective, angle: 'Progressive perspective angle', source: 'CNN' },
    conservative: { ...mockPerspective, angle: 'Conservative viewpoint angle', source: 'Fox News' },
  },
  engagement: mockEngagementMetrics,
  sources: [
    {
      name: 'Reuters',
      url: 'https://reuters.com/article/123',
      type: 'primary',
      perspective: 'neutral',
    },
    {
      name: 'CNN',
      url: 'https://cnn.com/article/456',
      type: 'secondary',
      perspective: 'liberal',
    },
    {
      name: 'Fox News',
      url: 'https://foxnews.com/article/789',
      type: 'secondary',
      perspective: 'conservative',
    },
  ],
};

// Test functions
function runTests() {
  console.log('🧪 Running Data Model Validation Tests...\n');
  
  let passed = 0;
  let failed = 0;
  
  function test(name, testFn) {
    try {
      const result = testFn();
      if (result) {
        console.log(`✅ ${name}`);
        passed++;
      } else {
        console.log(`❌ ${name}`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${name} - Error: ${error.message}`);
      failed++;
    }
  }
  
  // Test NewsPerspective validation
  test('NewsPerspective - Valid perspective passes validation', () => {
    return validateNewsPerspective(mockPerspective);
  });
  
  test('NewsPerspective - Invalid perspective fails validation', () => {
    const invalid = { ...mockPerspective, summary: '' };
    return !validateNewsPerspective(invalid);
  });
  
  test('NewsPerspective - Missing keyPoints fails validation', () => {
    const invalid = { ...mockPerspective, keyPoints: [] };
    return !validateNewsPerspective(invalid);
  });
  
  // Test NewsStory validation
  test('NewsStory - Valid story passes validation', () => {
    return validateNewsStory(mockNewsStory);
  });
  
  test('NewsStory - Invalid category fails validation', () => {
    const invalid = { ...mockNewsStory, category: 'invalid' };
    return !validateNewsStory(invalid);
  });
  
  test('NewsStory - Missing headline fails validation', () => {
    const invalid = { ...mockNewsStory, headline: '' };
    return !validateNewsStory(invalid);
  });
  
  test('NewsStory - Invalid readTime fails validation', () => {
    const invalid = { ...mockNewsStory, readTime: -5 };
    return !validateNewsStory(invalid);
  });
  
  // Test PerspectiveType validation
  test('PerspectiveType - Valid types pass validation', () => {
    return isValidPerspectiveType('neutral') && 
           isValidPerspectiveType('liberal') && 
           isValidPerspectiveType('conservative');
  });
  
  test('PerspectiveType - Invalid type fails validation', () => {
    return !isValidPerspectiveType('invalid');
  });
  
  // Test content quality validation
  test('Content Quality - Valid story passes quality check', () => {
    const result = validateContentQuality(mockNewsStory);
    return result.isValid;
  });
  
  test('Content Quality - Short headline fails quality check', () => {
    const invalid = { ...mockNewsStory, headline: 'Short' };
    const result = validateContentQuality(invalid);
    return !result.isValid && result.issues.includes('Headline too short');
  });
  
  // Summary
  console.log(`\n📊 Test Results:`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 All data model tests passed!');
    return true;
  } else {
    console.log('\n⚠️  Some tests failed. Please review the implementation.');
    return false;
  }
}

// Run the tests
const success = runTests();
process.exit(success ? 0 : 1);