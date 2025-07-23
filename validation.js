"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateContentQuality = exports.sanitizeStoryContent = exports.isValidPerspectiveType = exports.validateNewsPerspective = exports.validateNewsStory = void 0;
/**
 * Validate a news story object
 */
const validateNewsStory = (story) => {
    if (!story || typeof story !== 'object')
        return false;
    // Check required fields
    if (!story.id || typeof story.id !== 'string')
        return false;
    if (!story.headline || typeof story.headline !== 'string')
        return false;
    if (!story.category || !['politics', 'economy', 'social'].includes(story.category))
        return false;
    if (!story.publishedAt || !(story.publishedAt instanceof Date))
        return false;
    if (!story.imageUrl || typeof story.imageUrl !== 'string')
        return false;
    if (typeof story.readTime !== 'number' || story.readTime <= 0)
        return false;
    // Check perspectives
    if (!story.perspectives || typeof story.perspectives !== 'object')
        return false;
    if (!(0, exports.validateNewsPerspective)(story.perspectives.neutral))
        return false;
    if (!(0, exports.validateNewsPerspective)(story.perspectives.liberal))
        return false;
    if (!(0, exports.validateNewsPerspective)(story.perspectives.conservative))
        return false;
    // Check engagement metrics
    if (!story.engagement || typeof story.engagement !== 'object')
        return false;
    if (typeof story.engagement.views !== 'number')
        return false;
    if (typeof story.engagement.shares !== 'number')
        return false;
    if (typeof story.engagement.averageTimeSpent !== 'number')
        return false;
    return true;
};
exports.validateNewsStory = validateNewsStory;
/**
 * Validate a news perspective object
 */
const validateNewsPerspective = (perspective) => {
    if (!perspective || typeof perspective !== 'object')
        return false;
    if (!perspective.summary || typeof perspective.summary !== 'string')
        return false;
    if (!Array.isArray(perspective.keyPoints))
        return false;
    if (perspective.keyPoints.length === 0)
        return false;
    if (!perspective.keyPoints.every((point) => typeof point === 'string'))
        return false;
    if (!perspective.angle || typeof perspective.angle !== 'string')
        return false;
    if (!perspective.source || typeof perspective.source !== 'string')
        return false;
    if (typeof perspective.credibilityScore !== 'number')
        return false;
    if (typeof perspective.wordCount !== 'number')
        return false;
    return true;
};
exports.validateNewsPerspective = validateNewsPerspective;
/**
 * Validate perspective type
 */
const isValidPerspectiveType = (perspective) => {
    return ['neutral', 'liberal', 'conservative'].includes(perspective);
};
exports.isValidPerspectiveType = isValidPerspectiveType;
/**
 * Sanitize story content for display
 */
const sanitizeStoryContent = (content) => {
    // Remove HTML tags and decode entities
    return content
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
};
exports.sanitizeStoryContent = sanitizeStoryContent;
/**
 * Check if story content meets quality standards
 */
const validateContentQuality = (story) => {
    const issues = [];
    // Check headline length
    if (story.headline.length < 10) {
        issues.push('Headline too short');
    }
    if (story.headline.length > 100) {
        issues.push('Headline too long');
    }
    // Check perspective content length
    Object.entries(story.perspectives).forEach(([type, perspective]) => {
        if (perspective.summary.length < 50) {
            issues.push(`${type} perspective summary too short`);
        }
        if (perspective.summary.length > 500) {
            issues.push(`${type} perspective summary too long`);
        }
        if (perspective.keyPoints.length === 0) {
            issues.push(`${type} perspective missing key points`);
        }
    });
    // Check reading time
    if (story.readTime < 15 || story.readTime > 60) {
        issues.push('Reading time outside optimal range (15-60 seconds)');
    }
    return {
        isValid: issues.length === 0,
        issues,
    };
};
exports.validateContentQuality = validateContentQuality;
