/**
 * Created by hyman.hu on 2017/5/16.
 */
//多语言
var lang_dic = {
    en: {},
    cn: {
        err_msg: {
            tx_connect_fail: "Server connect failed.",
        },
        login: {
            tx_connect_fail: "連接錯誤，請檢查網絡連接。",
            tx_username_err: "請輸入賬號名",
            tx_pwd_err: "請輸入密碼",
            tx_pwd_err_again: "密碼錯誤",
            tx_username_err_again: "賬號錯誤",
            tx_username: "請輸入您的管理賬號",
            tx_password: "請輸入您的管理密碼",
            tx_remember: "記住我",
            tx_login: "登錄",
            tx_pwd_err: "Sorry, the account with this keycode was not found. ",
            tx_confirm: "確認",
            tx_close: "關閉",
            tx_alert: "警告",
            tx_ok: "OK"
        },
        main: {
            tx_login: "Log out",
            tx_vig: "VIG DM",
            tx_home: "Home",
            tx_device: "Device",
            tx_statistic: "Statistic",
            tx_all_location: "ALL LOCATION",
            tx_device_list: "DEVICE LIST",
            tx_status: "Status",
            tx_history: "History",
            tx_close: "Cancel",
            tx_confirm: "Confirm",
            tx_log_out: "Log Out"
        },
        landing_page: {
            tx_no_results: "No results found",
            address: "Address",
            time: "Time",
            car_location: "Location",
            data_error: "Data error",
            device_not_exist: "This device does not exist",
            search_text_wrong: "Search keywords do not match the rules"
        },
        device_list: {
            tx_device_list: "DEVICE LIST",
            tx_device: "Device",
            tx_update_time: "Update Time",
            tx_key_status: "Key status",
            tx_door: "Door lock",
            tx_tow_event: "Tow event",
            tx_on: "ON/START",
            tx_off: "OFF",
            tx_acc: "ACC",
            tx_unlock: "Unlock",
            tx_towing: "Towing",
            tx_clear: "Clear",
            tx_apply: "Apply",
            tx_filter: "Filter",
            tx_normal: "Normal",
            tx_lock: "Lock"
        },
        device_status: {
            tx_car_status: "Car status",
            tx_remote_control: "Remote control",
            tx_door_lock: "Door lock",
            tx_door_open: "Door open",
            tx_hock_btn: "Search car",
            tx_honk: "Honk",
            tx_honking: "Honking",
            tx_device_info: "Device Info",
            tx_device_name: "Device name",
            tx_device_id: "Device ID",
            tx_device_imei: "IMEI",
            tx_device_location: "Location",
            tx_fw_version: "Fw version",
            tx_update_now: "Update now",
            tx_updating: "Updating...",
            tx_lasted_version: "Lasted version",
            modal_update_title: "Update fail",
            modal_update_content: "Update failed. Do you want to try again now?",
            modal_confirm: "Try again",
            tx_fw_update_time: "Fw update time"
        },
        history: {
            tx_no_results: "No results found",
            tx_start: "Start",
            tx_end: "End",
            tx_search: "Search",
            tx_clear: "Clear",
            tow: "Tow",
            address: "Address",
            time: "Time",
            location: "Location",
            track_no_record: "No track record",
            set_time_help: "Please set up the time",
            endtime_earlier_start_help: "The end time can not be earlier than the start time",
            endtime_exceed_now_help: "The end time can not be earlier before current time",
            different_time_limit_help: "Do not exceed 12 hours during the set track",
            data_error: "Data error",
            gps_not_positioned: "GPS is not positioned"
        },
        statistic_page: {
            tx_dashboard: "Dashboard",
            tx_cars: "Cars",
            tx_online: "Online",
            tx_moving: "Moving",
            tx_towing: "Towing",
            tx_top1: "Top1 hot spot",
            tx_top2: "Top2 hot spot",
            tx_top3: "Top3 hot spot",
            tx_lowest: "Lowest",
            tx_highest: "Highest",
            tx_real_time: "Real-time vehicle speed",
            tx_events_statistic: "Events statistic"
        }
    }
};
