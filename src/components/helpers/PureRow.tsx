import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MAIN_GRAY, PRIMARY_COLOR } from "../../../assets/color";
import { scale, verticalScale } from "./Scaling";
import { Icon } from "react-native-elements";
import moment from "moment";

const PureRow = ({ item, index, nav, onDeleteEvent }: any) => {
  const onEdit = () => {
    nav.navigate("AddEvent", {
      current_event: item,
    });
  };

  const onDelete = () => {
    onDeleteEvent(item);
  };

  const onTimeRender = (date: Date) => {
    return moment(date).format("LT");
  };

  const onDateRender = (date: Date) => {
    return moment(date).format("LLL");
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      key={index}
      style={styles.commonOpacity}
    >
      <View
        style={{
          flex: 1,
          marginLeft: 12,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.commonText}>{item.name}</Text>
          <Icon
            onPress={onDelete}
            color={"#000"}
            name="trash-o"
            type="font-awesome"
            size={20}
            containerStyle={{
              position: "absolute",
              right: 40,
            }}
          />
          <Icon
            onPress={onEdit}
            color={"#000"}
            name="pencil"
            type="font-awesome"
            size={20}
            containerStyle={{
              position: "absolute",
              right: 10,
            }}
          />
        </View>

        <Text
          style={[
            styles.commonText,
            {
              color: PRIMARY_COLOR,
              marginTop: 8,
            },
          ]}
        >
          Start Time {onTimeRender(item.start_time)} End Time{" "}
          {onTimeRender(item.end_time)}
        </Text>
        <Text
          style={[
            styles.commonText,
            {
              color: PRIMARY_COLOR,
              marginTop: 8,
            },
          ]}
        >
          Date{""}
          {onDateRender(item.event_date)}
        </Text>

        <Text style={[styles.commonText, { color: MAIN_GRAY }]}>
          {item.description}
        </Text>

        <Text style={[styles.commonText, { color: MAIN_GRAY }]}>
          {item.event_type.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  commonOpacity: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: verticalScale(4),
    marginHorizontal: scale(12),
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 8,
    padding: 8,
  },
  commonText: {
    color: PRIMARY_COLOR,
    fontSize: scale(11),
    fontFamily: "BurlingamePro-CondSemiBold",
  },
});

export default PureRow;
