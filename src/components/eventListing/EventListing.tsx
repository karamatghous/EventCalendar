import React, { Component } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GREEN_COLOR, PRIMARY_COLOR } from "../../../assets/color";
import Button from "../helpers/Button";
import CustomBackHeader from "../helpers/CustomHeaderBackButton";
import PureRow from "../helpers/PureRow";
import { scale, verticalScale } from "../helpers/Scaling";
import { deleteEvent } from "../../redux/actions/eventAction";
import { Notifications } from "react-native-notifications";
import SelectDropdown from "react-native-select-dropdown";
import { EVENTS_TYPES } from "../../utils";

interface State {
  eventsList: any;
  empty: any;
  filtered_events: Array<any>;
  selected_type: any
}

interface Props {
  navigation: any;
  isFocused: boolean;
  events: any;
  actions: any;
  selected_type: any;
}

class EventListing extends Component {
  state: State;
  props: Props;
  dropRef: any;

  _unsubscribe: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      eventsList: [],
      selected_type: null,
      empty: "",
      filtered_events: []
    };
  }

  _renderRowItem = ({ item, index }: any) => (
    <PureRow
      item={item}
      index={index}
      nav={this.props.navigation}
      onDeleteEvent={this.onDeleteEvent}
    />
  );

  onDeleteEvent = (event: any) => {
    let { actions } = this.props;
    if (event?.notificationId)
      Notifications.cancelLocalNotification(event?.notificationId);
    actions.deleteEvent(event);
  };

  onSelect = (selectedItem: any) => {
    const { events } = this.props;

    this.setState({ selected_type: selectedItem, filtered_events: events.filter((item: any) => item.event_type.id === selectedItem.id) });
  };


  render() {
    const { events, navigation } = this.props;
    const { selected_type, filtered_events } = this.state;
    const navigate = navigation;

    return (
      <View style={{ flex: 1 }}>
        <CustomBackHeader
          show_backButton={false}
          nav={navigate}
          title={"My Events Listing"}
        />

        <View style={Style.topBtnContainer}>
          <Button
            button_label="Event Type Filter"
            on_press={() => {
              this.dropRef.openDropdown()
            }}
            text_style={Style.topbtnText}
            show_icon={true}
            custom_style={[
              Style.topButton,
              {
                marginRight: scale(12),
                backgroundColor: PRIMARY_COLOR,
              },
            ]}
          />

          <Button
            button_label="+ Create Event"
            on_press={() => {
              this.props.navigation.navigate("AddEvent");
            }}
            text_style={Style.topbtnText}
            custom_style={Style.topButton}
          />
        </View>
        <SelectDropdown
          ref={(ref) => this.dropRef = ref}
          data={EVENTS_TYPES}
          buttonStyle={{ height: 0 }}
          defaultValueByIndex={0}
          onSelect={this.onSelect}
          buttonTextAfterSelection={(item) => {
            return item.title;
          }}
          rowTextForSelection={(item) => {
            return item.title;
          }}
          rowStyle={{ backgroundColor: "#fff" }}
          selectedRowStyle={{ backgroundColor: "grey" }}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          disableVirtualization={false}
          data={selected_type !== null ? filtered_events : events}
          renderItem={this._renderRowItem}
          contentContainerStyle={{ marginTop: verticalScale(16) }}
          keyExtractor={(item) => item.title + ""}
          ListEmptyComponent={() => <View style={[Style.commonView, { justifyContent: "center", alignItems: "center" }]}>
            <Text style={Style.event}>No Event</Text>
          </View>}
        />

      </View>
    );
  }
}

const Style = StyleSheet.create({
  topButton: {
    flex: 1,
    backgroundColor: GREEN_COLOR,
    height: verticalScale(40),
    padding: scale(16),
    borderTopRightRadius: scale(2),
    borderBottomRightRadius: scale(2),
    borderRadius: 20,
  },
  topBtnContainer: {
    flexDirection: "row",
    marginHorizontal: scale(12),
    marginTop: verticalScale(10),
  },
  topbtnText: {
    fontFamily: "BurlingamePro-CondSemiBold",
    fontSize: scale(13),
  },
  commonView: {
    // flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 8,
    height: 200
  },
  event: { fontSize: 20, color: "grey" }
});

const mapStateToProps = (state: any) => ({
  events: state.event_reducer.events,
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators({ deleteEvent }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventListing);
