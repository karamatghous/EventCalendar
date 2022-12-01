import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";

const Button = ({ on_press, custom_style, text_style, show_icon, button_label, show_spinner }: any) => {
  return (
    <TouchableOpacity
      onPress={on_press}
      style={[styles.touchable_bg, custom_style]}
    >
      <Text style={[styles.text_color, text_style]}>
        {button_label}
      </Text>
      {show_icon && (
        <Icon
          color={"#fff"}
          name="chevron-thin-down"
          type="entypo"
          size={20}
          containerStyle={styles.container}
        />
      )}
      {show_spinner && (
        <ActivityIndicator
          size="small"
          color={"#fff"}
          style={styles.activity}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = {
  touchable_bg: {
    backgroundColor: "#000",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text_color: {
    fontSize: 12,
    color: "#fff",
  },
  container: {
    position: "absolute",
    right: 5,
  },
  activity: { marginLeft: 8, marginRight: 8 }
};

export default Button;
