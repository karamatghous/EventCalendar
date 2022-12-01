import React, { Component } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import moment from "moment";
import Modal from "react-native-modal";
import DatePicker from "react-native-date-picker";
import uuid from "react-native-uuid";
import SelectDropdown from "react-native-select-dropdown";

import {
  GREEN_COLOR,
  LIGHT_GRAY,
  ONYX_COLOR,
  PRIMARY_COLOR,
} from "../../../assets/color";
import CustomBackHeader from "../helpers/CustomHeaderBackButton";
import ErrorText from "../helpers/ErrorText";
import { scale, verticalScale } from "../helpers/Scaling";
import GradientButton from "../helpers/gradientButton";
import Button from "../helpers/Button";
import { setEvent, updateEvent } from "../../redux/actions/eventAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Notifications } from "react-native-notifications";
import { EVENTS_TYPES } from "../../utils";

interface State {
  id: string;
  notificationId: any;
  eventsList: number[];
  name: string;
  show_given_name_label: boolean;
  description: string;
  show_description_label: boolean;
  is_date: boolean;
  is_start_time: boolean;
  is_end_time: boolean;
  event_date: any;
  start_time: any;
  end_time: any;
  name_error: string;
  show_name_error: boolean;
  description_error: string;
  show_description_error: boolean;
  show_date_label: boolean;
  show_start_time_label: boolean;
  show_end_time_label: boolean;
  show_create_error: boolean;
  create_error: string;
  show_loading: boolean;
  event_type: {
    id: number;
    title: string;
  };
}

interface Props {
  navigation: any;
  actions: any;
  route: any;
}

class AddEvent extends Component {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    const current_event = props?.route?.params?.current_event;
    this.state = {
      event_type: current_event?.event_type ?? null,
      eventsList: [],
      notificationId: current_event?.notificationId ?? null,
      id: current_event?.id ?? null,
      name: current_event?.name ?? "",
      description: current_event?.description ?? "",
      event_date: current_event?.event_date ?? null,
      start_time: current_event?.start_time ?? null,
      end_time: current_event?.end_time ?? null,
      show_given_name_label: false,
      show_description_label: false,
      is_date: false,
      is_start_time: false,
      is_end_time: false,
      name_error: "",
      show_name_error: false,
      description_error: "",
      show_description_error: false,
      show_date_label: false,
      show_start_time_label: false,
      show_end_time_label: false,
      show_create_error: false,
      create_error: "",
      show_loading: false,
    };
  }
  showDatePicker = () => {
    this.setState({
      is_date: true,
    });
  };
  showStartTimePicker = () => {
    this.setState({
      is_start_time: true,
    });
  };
  showEndTimePicker = () => {
    this.setState({
      is_end_time: true,
    });
  };

  onDateRender = (date: Date) => {
    if (date) return moment(date).format("LL");
    else return "";
  };

  onTimeRender = (date: Date) => {
    if (date) return moment(date).format("LT");
    else return "";
  };

  createInputField = (
    id: number,
    is_mandatory: boolean,
    multiline: boolean,
    ref: string,
    value: any,
    show_label: boolean,
    input_placeholder_label: string,
    input_error: string,
    is_error_visible: boolean,
    keyboard_type: any,
    input_handler: any,
    editable: boolean
  ) => {
    return (
      <View
        style={{
          marginBottom: 0,
          paddingTop: 16,
          marginRight: id == 3 ? scale(8) : 0,
          width: id == 3 || id == 4 ? "50%" : "100%",
        }}
      >
        {show_label && (
          <Text
            style={{
              fontSize: scale(11),
              alignSelf: "flex-start",
              paddingLeft: scale(8),
              marginBottom: verticalScale(4),
              fontFamily: "BurlingamePro-CondSemiBold",
              color: ONYX_COLOR,
              elevation: 8,
            }}
          >
            {is_mandatory
              ? `${input_placeholder_label}*`
              : input_placeholder_label}
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
            paddingLeft: scale(8),
            paddingRight: scale(8),
            paddingBottom: Platform.OS == "ios" ? verticalScale(10) : 0,
            paddingTop: Platform.OS == "ios" ? verticalScale(10) : 0,
            width: "100%",
            borderColor: LIGHT_GRAY,
            borderBottomWidth: 1,
            alignItems: "center",
          }}
        >
          <TextInput
            onTouchStart={() =>
              editable == false
                ? id == 3
                  ? this.showStartTimePicker()
                  : id == 4
                    ? this.showEndTimePicker()
                    : this.showDatePicker()
                : ""
            }
            editable={true}
            keyboardType={keyboard_type}
            returnKeyType={Platform.OS == "ios" ? "done" : "none"}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            multiline={multiline}
            autoCorrect={false}
            placeholder={
              is_mandatory
                ? `${input_placeholder_label}*`
                : input_placeholder_label
            }
            placeholderTextColor="#bbb"
            value={
              ref == "date_picker"
                ? this.onDateRender(value)
                : ref == "time_picker"
                  ? this.onTimeRender(value)
                  : value
            }
            onChangeText={(text) => input_handler(text)}
            style={{
              flex: 1,
              color: "#848484",
              fontSize: scale(12),
              fontFamily: "BurlingamePro-CondSemiBold",
            }}
            ref={ref}
          />
        </View>
        {is_error_visible && <ErrorText error_text={input_error} />}
      </View>
    );
  };

  handleGivenName = (text: any) => {
    const { name } = this.state;
    this.setState({ name: text }, () => {
      if (name.length > 0) {
        this.setState({ show_given_name_label: true, show_name_error: false });
      } else {
        this.setState({ show_given_name_label: false });
      }
    });
  };

  handleDescription = (text: any) => {
    const { description } = this.state;

    this.setState({ description: text }, () => {
      if (description.length > 0) {
        this.setState({
          show_description_label: true,
          show_description_error: false,
        });
      } else {
        this.setState({ show_description_label: false });
      }
    });
  };

  setStartTime = async (time: any) => {
    this.setState({
      start_time: time,
    });
  };

  setEndTime = async (time: any) => {
    // let endTimeStamp = formatToTimeStamp(time);
    this.setState({
      end_time: time,
    });
  };

  setEventDate = (date: Date) => {
    this.setState({
      event_date: date,
    });
  };

  showTimePickerModal = () => {
    const {
      start_time,
      end_time,
      event_date,
      is_start_time,
      is_end_time,
      is_date,
    } = this.state;
    let text_info1 = "";

    if (is_start_time) {
      text_info1 = "Pick Start Time";
    } else if (is_end_time) {
      text_info1 = "Pick End Time";
    } else {
      text_info1 = "Pick Event Date";
    }
    let currentDate = new Date();
    return (
      <Modal
        style={{
          justifyContent: "flex-end",
          margin: 0,
          marginHorizontal: scale(16),
        }}
        useNativeDriver={true}
        backdropTransitionOutTiming={0}
        animationInTiming={500}
        animationOutTiming={500}
        isVisible={is_date || is_start_time || is_end_time}
        onBackdropPress={() => {
          this.setState({
            is_date: false,
            is_time_modal_visible: false,
          });
        }}
      >
        <View
          style={{
            maxHeight: "95%",
            justifyContent: "center",
            backgroundColor: "#fff",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "transparent",
            borderTopLeftRadius: scale(24),
            borderTopRightRadius: scale(24),
            paddingTop: verticalScale(4),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                paddingHorizontal: scale(18),
              }}
            >
              <Text
                style={{
                  marginTop: verticalScale(12),
                  marginBottom: verticalScale(8),
                  fontSize: scale(14),
                  color: PRIMARY_COLOR,
                  fontFamily: "BurlingamePro-CondBold",
                  alignSelf: "center",
                  paddingHorizontal: scale(2),
                  textAlign: "center",
                }}
              >
                {text_info1.toUpperCase()}
              </Text>
              {
                <DatePicker
                  date={
                    is_start_time
                      ? start_time
                      : is_end_time
                        ? end_time
                        : event_date
                  }
                  mode={is_start_time || is_end_time ? "time" : "date"}
                  minimumDate={currentDate}
                  onDateChange={(time) => {
                    if (time) {
                      is_start_time
                        ? this.setState({ start_time: time })
                        : is_end_time
                          ? this.setState({ end_time: time })
                          : this.setState({ event_date: time });
                    }
                  }}
                />
              }
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              marginTop: verticalScale(12),
            }}
          >
            <GradientButton
              button_label={"CONFIRM"}
              on_press={() => {
                this.setState({
                  is_date: false,
                  is_start_time: false,
                  is_end_time: false,
                });
              }}
              text_style={{
                fontFamily: "BurlingamePro-SemiBold",
                color: "#fff",
                paddingHorizontal: scale(60),
                fontSize: scale(16),
              }}
              custom_style={{
                backgroundColor: "transparent",
                height: verticalScale(37.5),
                borderRadius: scale(24),
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              marginTop: verticalScale(8),
              marginBottom: verticalScale(16),
              height: verticalScale(37.5),
              borderRadius: scale(24),
              borderWidth: 1,
              borderColor: "transparent",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",

              backgroundColor: LIGHT_GRAY,
            }}
            onPress={() => {
              this.setState({
                is_date: false,
                is_start_time: false,
                is_end_time: false,
              });
            }}
          >
            <Text
              style={{
                paddingHorizontal: scale(80),
                color: PRIMARY_COLOR,
                fontSize: scale(12),
                fontFamily: "BurlingamePro-SemiBold",
              }}
            >
              CANCEL
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  saveEvent = async () => {
    let { actions } = this.props;
    const {
      id,
      name,
      description,
      event_date,
      start_time,
      end_time,
      notificationId,
      event_type,
    } = this.state;

    this.setState({
      show_loading: true,
    });
    if (name.trim() == "") {
      this.setState({
        show_name_error: true,
        show_loading: false,
        name_error: "Please enter name",
      });
      return;
    } else if (description.trim() == "") {
      this.setState({
        description_error: "please enter description",
        show_description_error: true,
        show_loading: false,
      });
      return;
    } else if (!event_date) {
      this.setState({
        create_error: "event date & time is not valid",
        show_create_error: true,
        show_loading: false,
      });
      return;
    } else if (!start_time) {
      this.setState({
        create_error: "event date & time is not valid",
        show_create_error: true,
        show_loading: false,
      });
      return;
    } else if (!end_time) {
      this.setState({
        create_error: "event date & time is not valid",
        show_create_error: true,
        show_loading: false,
      });
      return;
    }

    let newEvent = {
      id: id ?? uuid.v4(),
      name,
      description,
      event_date,
      start_time,
      end_time,
      event_type,
    };

    let nId = Notifications.postLocalNotification({
      body: description,
      title: name,
      fireDate: event_date,
    });

    if (id) {
      Notifications.cancelLocalNotification(notificationId);

      actions.updateEvent({ ...newEvent, notificationId: nId });
    } else {
      actions.setEvent({ ...newEvent, notificationId });
    }

    this.setState({
      show_loading: false,
    });

    this.props.navigation.goBack();
  };

  render() {
    const {
      id,
      event_type,
      show_create_error,
      create_error,
      show_loading,
      name,
      show_given_name_label,
      name_error,
      show_name_error,
      description,
      show_description_label,
      description_error,
      show_description_error,
      event_date,
      show_date_label,
      start_time,
      show_start_time_label,
      end_time,
      show_end_time_label,
    } = this.state;

    const navigate = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <CustomBackHeader
          show_backButton={true}
          nav={navigate}
          title={"Create Event"}
        />
        <View
          style={[
            styles.commonView,
            {
              marginHorizontal: scale(12),
              marginTop: verticalScale(30),
              paddingHorizontal: scale(8),
            },
          ]}
        >
          {this.createInputField(
            0,
            true,
            false,
            "name",
            name,
            show_given_name_label,
            "Name",
            name_error,
            show_name_error,
            "default",
            this.handleGivenName,
            true
          )}
          {this.createInputField(
            1,
            true,
            true,
            "description",
            description,
            show_description_label,
            "Description",
            description_error,
            show_description_error,
            "default",
            this.handleDescription,
            true
          )}
          {this.createInputField(
            2,
            true,
            true,
            "date_picker",
            event_date,
            show_date_label,
            "Event Date",
            "",
            false,
            "default",
            null,
            false
          )}
          <View style={{ flexDirection: "row" }}>
            {this.createInputField(
              3,
              true,
              true,
              "time_picker",
              start_time,
              show_start_time_label,
              "Start Times",
              "",
              false,
              "default",
              this.handleDescription,
              false
            )}
            {this.createInputField(
              4,
              true,
              true,
              "time_picker",
              end_time,
              show_end_time_label,
              "End Times",
              "",
              false,
              "default",
              this.handleDescription,
              false
            )}
          </View>
          {show_create_error && <ErrorText error_text={create_error} />}
          <View style={styles.commonView}>
            <SelectDropdown
              data={EVENTS_TYPES}
              defaultValue={event_type}
              buttonStyle={{
                backgroundColor: "transparent",
              }}
              onSelect={(selectedItem) => {
                this.setState({ event_type: selectedItem });
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem?.title;
              }}
              rowTextForSelection={(item) => {
                return item.title;
              }}
              rowStyle={{ backgroundColor: "#fff" }}
              selectedRowStyle={{ backgroundColor: "#fdd03e" }}
            />
          </View>
        </View>
        <View style={styles.bottomView}>
          <Button
            button_label={id ? "Update Event" : "Create Event"}
            on_press={this.saveEvent}
            show_spinner={show_loading}
            text_style={styles.textStyle}
            custom_style={styles.customButtonStyle}
          />
        </View>
        {this.showTimePickerModal()}
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators({ setEvent, updateEvent }, dispatch),
});

const styles = StyleSheet.create({
  commonView: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 8,
  },
  bottomView: {
    marginBottom: "20%",
    marginTop: "10%",
    marginHorizontal: scale(20),
  },
  customButtonStyle: {
    backgroundColor: GREEN_COLOR,
    height: verticalScale(40),
    padding: scale(16),
    borderTopRightRadius: scale(2),
    borderBottomRightRadius: scale(2),
  },
  textStyle: {
    fontFamily: "BurlingamePro-CondSemiBold",
    fontSize: scale(13),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
