import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Platform,
  UIManager,
} from 'react-native';
import {AccordionList} from 'react-native-accordion-list-view';

const Faq = () => {
  const data = [
    {
      id: 0,
      title: 'Question number one?',
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown ",
    },
    {
      id: 1,
      title: 'Question number two?',
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
    },
    {
      id: 3,
      title: 'Question number three?',
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
    },
    {
      id: 4,
      title: 'Question number four?',
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
    },
  ];
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <AccordionList
          data={data}
          customTitle={item => (
            <Text
              style={{
                color: 'black',
                padding: 10,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {item.title}
            </Text>
          )}
          customBody={item => (
            <Text
              style={{
                color: 'black',
                padding: 10,
                fontSize: 14,
              }}>
              {item.body}
            </Text>
          )}
          animationDuration={400}
          expandMultiple={true}
        />
        {/* <Text>Hello</Text> */}
      </View>
    </SafeAreaView>
  );
};

export default Faq;
const styles = StyleSheet.create({
  container: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    height: '100%',
    borderRadius: 5,
  },
});
