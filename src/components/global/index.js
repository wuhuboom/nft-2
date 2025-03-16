// 全局组件
import AppBackTop from "@/components/global/AppBackTop.vue";
import AppBtmBar from "@/components/global/AppBtmBar";
import AppTopBar from "@/components/global/AppTopBar";
import BtmActionLang from "@/components/global/BtmActionLang.vue";
import BtmActionSheet from "@/components/global/BtmActionSheet.vue";
import ChoseNav from "@/components/global/ChoseNav.vue";
import ComfireDialog from "@/components/global/ComfireDialog.vue";
import ImgCom from "@/components/global/ImgCom.vue";
import LoadList from "@/components/global/LoadList.vue";
import MyServe from "@/components/global/MyServe.vue";
import NoData from "@/components/global/NoData.vue";
import RowList from "@/components/global/RowList.vue";
import RowMatch from "@/components/global/RowMatch.vue";
import SelectLang from "@/components/global/SelectLang.vue";
import SelectNav from "@/components/global/SelectNav.vue";
import Countdown from "@choujiaojiao/vue2-countdown";
import {
  ActionSheet,
  Badge,
  Button,
  Checkbox,
  Dialog,
  DropdownItem,
  DropdownMenu,
  Field,
  Form,
  Grid,
  GridItem,
  Icon,
  Image,
  Lazyload,
  List,
  Loading,
  PasswordInput,
  picker,
  Popup,
  Progress,
  radio,
  RadioGroup,
  Step,
  stepper,
  Steps,
  Sticky,
  Swipe,
  SwipeItem,
  tab,
  tabs,
  Toast,
  uploader,
} from "vant";
export default {
  install(Vue) {
    Vue.component("MyServe", MyServe);
    Vue.component("Count-down", Countdown);
    Vue.component(RowList.name, RowList);
    Vue.component(AppBtmBar.name, AppBtmBar);
    Vue.component(ImgCom.name, ImgCom);
    Vue.component(BtmActionSheet.name, BtmActionSheet);
    Vue.component(AppTopBar.name, AppTopBar);
    Vue.component(AppBackTop.name, AppBackTop);
    Vue.component(NoData.name, NoData);
    Vue.component(RowMatch.name, RowMatch);
    Vue.component(ComfireDialog.name, ComfireDialog);
    Vue.component(BtmActionLang.name, BtmActionLang);
    Vue.component(LoadList.name, LoadList);
    Vue.component(SelectLang.name, SelectLang);
    Vue.component(ChoseNav.name, ChoseNav);
    Vue.component(SelectNav.name, SelectNav);
    Vue.use(Form);
    Vue.use(Field);
    Vue.use(Button);
    Vue.use(radio);
    Vue.use(RadioGroup);
    Vue.use(picker);
    Vue.use(ActionSheet);
    Vue.use(Icon);
    Vue.use(Toast);
    Vue.use(Swipe);
    Vue.use(SwipeItem);
    Vue.use(Lazyload);
    Vue.use(Image);
    Vue.use(List);
    Vue.use(Dialog);
    Vue.use(Loading);
    Vue.use(Badge);
    Vue.use(Progress);
    Vue.use(Grid);
    Vue.use(GridItem);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(uploader);
    Vue.use(Checkbox);
    Vue.use(Sticky);
    Vue.use(Popup);
    Vue.use(Step);
    Vue.use(Steps);
    Vue.use(tabs);
    Vue.use(tab);
    Vue.use(PasswordInput);
    Vue.use(stepper);
  },
};
