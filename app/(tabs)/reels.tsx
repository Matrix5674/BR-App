import { Video, ResizeMode } from 'expo-av';
import { StyleSheet, FlatList, View, Text, Dimensions, ViewToken} from 'react-native';

import { ThemedText } from '@/components/ThemedText';

import { useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';


const { height } = Dimensions.get('window');

const reels = [
  {
    id: 'r1',
    name: 'CNN Breaking News',
    url: require('../../assets/Reels_Data/Reel_One.mp4'),
    caption: 'Breaking: Major climate summit underway in Europe.',
    tags: ['news', 'climate', 'breaking', 'summit'],
    date_published: '2025-07-20T15:00:00Z',
  },
  {
    id: 'r2',
    name: 'Dean Withers',
    url: require('../../assets/Reels_Data/Reel_Two.mp4'),
    caption: 'Why the latest bill might change healthcare forever.',
    tags: ['politics', 'healthcare', 'policy', 'deanwithers'],
    date_published: '2025-07-18T12:30:00Z',
  },
  {
    id: 'r3',
    name: 'BBC News',
    url: require('../../assets/Reels_Data/Reel_Three.mp4'),
    caption: 'Global markets react to new trade agreements.',
    tags: ['economy', 'markets', 'trade', 'bbcnews'],
    date_published: '2025-07-19T09:00:00Z',
  },
  /* {
    id: 'r4',
    name: 'The Daily Signal',
    url: 'https://thedailysignal.com/shorts/conservative-policy-breakdown.mp4',
    caption: 'Key points from recent conservative policy changes.',
    tags: ['policy', 'conservative', 'news', 'dailysignal'],
    date_published: '2025-07-17T16:45:00Z',
  },
  {
    id: 'r5',
    name: 'NowThis Politics',
    url: 'https://nowthisnews.com/politics/clip-2025-07-20.mp4',
    caption: 'Top 3 reasons this election is unlike any before.',
    tags: ['election', 'politics', 'voting', 'nowthis'],
    date_published: '2025-07-20T10:15:00Z',
  },
  {
    id: 'r6',
    name: 'The Hill',
    url: 'https://thehill.com/news/shorts/congress-hearing-highlights.mp4',
    caption: 'Highlights from today’s Congressional hearing.',
    tags: ['congress', 'hearing', 'politics', 'thehill'],
    date_published: '2025-07-18T14:00:00Z',
  },
  {
    id: 'r7',
    name: 'Jubilee',
    url: 'https://jubileeproject.org/shorts/social-issues.mp4',
    caption: 'A powerful conversation on race and unity.',
    tags: ['social', 'race', 'unity', 'jubilee'],
    date_published: '2025-07-19T11:30:00Z',
  },
  {
    id: 'r8',
    name: 'The Young Turks',
    url: 'https://tytnetwork.com/shorts/left-wing-analysis.mp4',
    caption: 'What the left really thinks about the new infrastructure bill.',
    tags: ['politics', 'leftwing', 'infrastructure', 'tyt'],
    date_published: '2025-07-20T13:00:00Z',
  },
  {
    id: 'r9',
    name: 'CNN Business',
    url: 'https://cnn.com/business/shorts/tech-stock-crash.mp4',
    caption: 'Tech stocks take a dive after earnings reports.',
    tags: ['business', 'stocks', 'tech', 'cnn'],
    date_published: '2025-07-19T17:20:00Z',
  },
  {
    id: 'r10',
    name: 'Political Humor Daily',
    url: 'https://politicalhumordaily.com/shorts/funny-political-sketch.mp4',
    caption: 'Satire on the latest political scandal.',
    tags: ['comedy', 'satire', 'politics', 'humor'],
    date_published: '2025-07-20T08:00:00Z',
  },
  */
];



export default function TabTwoScreen() {


  const isFocused = useIsFocused();
    
  const [inView, setInView] = useState(reels[0].id);
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 80 }).current;

    useEffect(() => {
      if (!isFocused) {
        setInView(''); 
      }
    }, [isFocused]);

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setInView(viewableItems[0].item.id);
    }
  };
  
  const renderReel = ({ item }: { item: any }) => {
      return (
          <View style={styles.reelContainer}>
              <Text> {item.id} </Text>
              <Video
                  source={ item.url }
                  style={{width:'100%', height:height}}
                  isLooping={ true }
                  shouldPlay={ inView === item.id && isFocused }
                  resizeMode= { ResizeMode.COVER }
              />
              <Text>{item.caption}</Text>
          </View>
      )
  }

  return (
    <View style={{ flex: 1 }}>
    <View style={styles.headerOverlay}>
      <ThemedText type="title">Reels</ThemedText>
    </View>
    <FlatList
      data={reels}
      keyExtractor={item => item.id}
      renderItem={renderReel}
      contentContainerStyle={{ paddingTop: 80 }} // adjust as needed
      pagingEnabled
      snapToAlignment="start"
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged= {onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  </View>

  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    marginTop:60,
    marginLeft:15,
    flexDirection: 'row',
    gap: 8,
    
  },
  reelContainer: {
    borderWidth: 1,
    borderColor: 'red',
    width: '100%',
    height: height,
    marginVertical: 16,
    alignItems: 'center',
  },
  headerOverlay: {
    position: 'absolute',
    top: 10,
    left: 0,
    width: '100%',
    zIndex: 10,
    paddingTop: 40, // adjust for status bar
    paddingLeft: 15,
    backgroundColor: 'transparent',
  },
});
