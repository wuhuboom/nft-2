// 全局组件
import AppTopBar from "@/components/global/AppTopBar";
import AppBtmBar from "@/components/global/AppBtmBar";
import BtmActionSheet from "@/components/global/BtmActionSheet.vue";
import ImgCom from "@/components/global/ImgCom.vue";
import RowList from "@/components/global/RowList.vue";
import Countdown from "@choujiaojiao/vue2-countdown";
import AppBackTop from "@/components/global/AppBackTop.vue";
import NoData from "@/components/global/NoData.vue";
import RowMatch from "@/components/global/RowMatch.vue";
import ComfireDialog from "@/components/global/ComfireDialog.vue";
import BtmActionLang from "@/components/global/BtmActionLang.vue";
import LoadList from "@/components/global/LoadList.vue";
import SelectLang from "@/components/global/SelectLang.vue";
import ChoseNav from "@/components/global/ChoseNav.vue";
import SelectNav from "@/components/global/SelectNav.vue";
import {
  Form,
  Field,
  Button,
  radio,
  RadioGroup,
  picker,
  ActionSheet,
  Icon,
  Toast,
  Swipe,
  SwipeItem,
  Lazyload,
  Image,
  List,
  Dialog,
  Loading,
  Badge,
  Progress,
  Grid,
  GridItem,
  DropdownMenu,
  DropdownItem,
  uploader,
  Checkbox,
  Sticky,
  Popup,
  Step,
  Steps,
  tabs,
  tab,
  PasswordInput,
} from "vant";
export default {
  install(Vue) {
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
  },
};
