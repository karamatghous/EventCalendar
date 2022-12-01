import React from "react";
import { Icon } from "react-native-elements";
import { MAIN_GRAY } from "../../../assets/color";
import { TouchableOpacity } from "react-native";

const CreateBackButton = ({ navigate, is_cross }: any) => {
  return (
    <TouchableOpacity
      style={{ marginLeft: 12 }}
      onPress={() => {
        navigate.goBack();
      }}
    >
      {is_cross ? (
        <Icon color={MAIN_GRAY} name="close" type="evil-icons" size={28} />
      ) : (
        <Icon
          color={MAIN_GRAY}
          name="chevron-thin-left"
          type="entypo"
          size={26}
        />
      )}
    </TouchableOpacity>
  );
};

export default CreateBackButton;
