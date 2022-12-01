import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { scale } from "./Scaling";

const GradientButton = ({ on_press, custom_style, icon_value, button_label, text_style, showLoading }: any) => {
  return (
    <TouchableOpacity onPress={on_press}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#1BD5FF", "#1290FF"]}
        style={[styles.touchable_bg, custom_style]}
      >
        <Icon
          color={"#fff"}
          name={icon_value}
          type="material-community"
          size={scale(27.5)}
        />
        <Text style={[styles.text_color, text_style]}>
          {button_label}
        </Text>
        {showLoading && (
          <ActivityIndicator
            size="small"
            color={"#fff"}
            style={{ marginLeft: 8, marginRight: 8 }}
          />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = {
  touchable_bg: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text_color: {
    textAlign: "center",
    fontSize: scale(12),
    marginLeft: scale(6),
    color: "#fff",
  },
};

export default GradientButton;
