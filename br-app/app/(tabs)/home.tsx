import { Image } from 'expo-image';
import { Platform, Dimensions, StyleSheet, ScrollView, Text, TouchableOpacity, FlatList, View} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

//Dummy data
const stories = [
  { id: '1', name: 'Alice', image: 'https://placekitten.com/100/100' },
  { id: '2', name: 'Bob', image: 'https://placekitten.com/101/100' },
  { id: '3', name: 'Charlie', image: 'https://placekitten.com/102/100' },
  // ...more stories
];

const posts = [
  { id: 'p1', user: 'Alice', content: 'Post 1 content', image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=1080' },
  { id: 'p2', user: 'Bob', content: 'Post 2 content', image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1080' },
  { id: 'p3', user: 'Charlie', content: 'Post 3 content', image: 'https://picsum.photos/id/237/1080/720' },
    //...more posts
];



export default function HomeScreen() {
    const {width, height} = Dimensions.get('window')

    const wp = (percentage: number) => width * (percentage / 100);
    const hp = (percentage: number) => height * (percentage / 100);

    const renderStory = ({ item }: {item: any}) => (
        <TouchableOpacity style={styles.storyContainer}>
            <Image source={{ uri: item.image }} style={styles.storyImage} />
            <Text style={styles.storyName}>{item.name}</Text>
        </TouchableOpacity>
    )


  const renderPost = ({ item }: { item: any }) => (

    <View style={styles.postContainer}>
      <Text style={styles.postUser}>{item.user}</Text>
      <Image
        source={{uri:item.image}}
        style={{width: 400, height: 275}}
      />
      <Text>{item.content}</Text>
    </View>
  );

  return (
      <>
            <FlatList
              data={posts}
              keyExtractor={item => item.id}
              renderItem={renderPost}
              ListHeaderComponent={
                <View>
                  <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">Newsreels</ThemedText>
                  </ThemedView>

                  <ThemedView style={styles.stepContainer}>
                    <ThemedText type="subtitle">Pulses</ThemedText>
                  </ThemedView>

                  <View style={styles.storiesWrapper}>
                    <FlatList
                      data={stories}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={item => item.id}
                      renderItem={renderStory}
                    />
                  </View>

                  <ThemedView style={styles.stepContainer}>
                      <ThemedText type="subtitle">For you</ThemedText>
                    </ThemedView>
                </View>
              }
            />
      </>




  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 60,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  stepContainer: {
    marginTop: 10,
    marginHorizontal: 15,
    gap: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
    storiesWrapper: {
      height: 120,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingVertical: 10,
    },
    storyContainer: {
      width: 80,
      marginHorizontal: 8,
      alignItems: 'center',
    },
    storyImage: {
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 2,
      borderColor: '#ff8501',
    },
    storyName: {
      marginTop: 5,
      fontSize: 12,
    },
    postContainer: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      alignItems: 'center',
    },
    postUser: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
});
