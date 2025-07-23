// Jest setup file
import 'react-native-gesture-handler/jestSetup';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn().mockImplementation(() => ({
    set: jest.fn(),
    getString: jest.fn(),
    getNumber: jest.fn(),
    getBoolean: jest.fn(),
    clearAll: jest.fn(),
    delete: jest.fn(),
  })),
}));

// Mock expo-image
jest.mock('expo-image', () => ({
  __esModule: true,
  Image: 'Image',
  ImageContentFit: {
    contain: 'contain',
    cover: 'cover',
    fill: 'fill',
    scaleDown: 'scale-down',
    none: 'none',
  },
  prefetch: jest.fn(),
  clearMemoryCache: jest.fn(),
  clearDiskCache: jest.fn(),
}));

// Mock expo modules
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

jest.mock('expo-speech', () => ({
  speak: jest.fn(),
  stop: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  isSpeakingAsync: jest.fn(() => Promise.resolve(false)),
  getAvailableVoicesAsync: jest.fn(() => Promise.resolve([])),
}));

jest.mock('expo-av', () => ({
  Audio: {
    requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
    setAudioModeAsync: jest.fn(),
    Recording: jest.fn().mockImplementation(() => ({
      prepareToRecordAsync: jest.fn(),
      startAsync: jest.fn(),
      stopAndUnloadAsync: jest.fn(),
      getURI: jest.fn(() => 'mock-uri'),
    })),
  },
}));

// Mock expo-sharing
jest.mock('expo-sharing', () => ({
  shareAsync: jest.fn(() => Promise.resolve()),
  isAvailableAsync: jest.fn(() => Promise.resolve(true)),
}));

// Mock expo-notifications
jest.mock('expo-notifications', () => ({
  requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  scheduleNotificationAsync: jest.fn(),
  cancelAllScheduledNotificationsAsync: jest.fn(),
  setNotificationHandler: jest.fn(),
  getPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
}));

// Mock TurboModuleRegistry first to prevent DevMenu issues
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
  getEnforcing: jest.fn(() => ({
    show: jest.fn(),
  })),
  get: jest.fn(() => null),
}));

// Mock React Native modules
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    AppState: {
      currentState: 'active',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
    DeviceEventEmitter: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
      emit: jest.fn(),
      removeAllListeners: jest.fn(),
    },
    NativeModules: {
      ...RN.NativeModules,
      DevMenu: {
        show: jest.fn(),
      },
    },
    Platform: {
      OS: 'ios',
      Version: '14.0',
      constants: {},
      select: jest.fn((obj) => obj.ios || obj.default),
      isPad: false,
      isTesting: true,
    },
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 812 })),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
    AccessibilityInfo: {
      isScreenReaderEnabled: jest.fn(() => Promise.resolve(false)),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      announceForAccessibility: jest.fn(),
    },
    Alert: {
      alert: jest.fn(),
    },
    FlatList: 'FlatList',
    ScrollView: 'ScrollView',
    VirtualizedList: 'VirtualizedList',
  };
});

// Mock network status
Object.defineProperty(navigator, 'onLine', {
  writable: true,
  value: true,
});

// Mock window events for network status
global.mockAddEventListener = jest.fn();
global.mockRemoveEventListener = jest.fn();

// Only define if window exists and doesn't already have these properties mocked
if (typeof window !== 'undefined') {
  if (!window.addEventListener || typeof window.addEventListener !== 'function') {
    Object.defineProperty(window, 'addEventListener', {
      value: global.mockAddEventListener,
      writable: true,
    });
  }
  if (!window.removeEventListener || typeof window.removeEventListener !== 'function') {
    Object.defineProperty(window, 'removeEventListener', {
      value: global.mockRemoveEventListener,
      writable: true,
    });
  }
}

// Mock performance API
global.performance = {
  now: jest.fn(() => Date.now()),
  mark: jest.fn(),
  measure: jest.fn(),
  getEntriesByName: jest.fn(() => []),
  getEntriesByType: jest.fn(() => []),
};

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 16));
global.cancelAnimationFrame = jest.fn();

// Silence the warning: Animated: `useNativeDriver` is not supported
// Note: This mock is commented out due to path issues in newer React Native versions
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');