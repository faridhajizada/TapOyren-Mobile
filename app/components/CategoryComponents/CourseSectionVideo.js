import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import colors from '../../config/colors';

const CourseSectionVideo = ({sectionVideo, setVideoId, handleSelection, selectedItem}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const iconName = isPlaying ? 'play-circle' : 'play-circle-outline';
  const titleColor = isPlaying ? colors.primary : 'gray';

  useEffect(() => {
    if (sectionVideo.title === selectedItem) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [selectedItem]);

  const handlePlay = () => {
    handleSelection(sectionVideo.title)
    
    setVideoId(setVideoId);
  }
  return (
    <TouchableWithoutFeedback onPress={handlePlay}>
      <View style={styles.sectionVideo}>
        <Ionicons name={iconName} color={colors.primary} size={24} style={{marginRight: 5}} />
        <View style={styles.videoInfo}>
          <Text numberOfLines={2} style={[{marginRight: 5, flex: 1}, {color: titleColor}]}>{sectionVideo.title}</Text>
          <Text style={[{color: titleColor}]}>{(sectionVideo.timescale/3600).toFixed(2)}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CourseSectionVideo

const styles = StyleSheet.create({
  sectionVideo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    margin: 3,
  },
  videoInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
})
