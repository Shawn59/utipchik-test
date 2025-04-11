import { rootStoreType } from '../../../../RootStore';
import { makeAutoObservable } from 'mobx';

interface IForm {
  fields: {
    [key: string]: {
      value: any;
      rules: string;
      errorMessage: string;
      [key]?: string;
    };
  };
  isValidForm: boolean;
}

export class ContentBaseFiltersStore {
  rootStore: rootStoreType;

  form: IForm = {
    fields: {},
    isValidForm: false,
  };

  screenOptionList = [
    { value: 1, label: '1920x800' },
    { value: 2, label: '1200x400' },
  ];

  typeOptionList = [
    { value: 1, label: 'Онлайн' },
    { value: 2, label: 'Офлайн' },
    { value: 3, label: 'Текст' },
  ];

  stateModerationOptionList = [
    { value: 1, label: 'Одобрено' },
    { value: 2, label: 'Отказано' },
    { value: 3, label: 'Возвращено на доработку' },
  ];

  constructor(rootStore: rootStoreType) {
    this.rootStore = rootStore;

    this.initForm();

    makeAutoObservable(this, { rootStore: false });
  }

  initForm = () => {
    this.form = {
      fields: {
        periodTime: {
          value: [0, 180],
          rules: 'required',
          errorMessage: '',
        },

        startDate: {
          value: '',
          rules: 'required',
          errorMessage: '',
        },

        endDate: {
          value: '',
          rules: 'required',
          errorMessage: '',
        },

        userId: {
          value: '',
          rules: 'required',
          errorMessage: '',
        },

        typeContent: {
          value: '',
          rules: 'required',
          errorMessage: '',
        },

        screen: {
          value: '',
          rules: 'required',
          errorMessage: '',
        },

        broadcastStatus: {
          value: false,
          rules: 'required',
          errorMessage: '',
        },

        hashTags: {
          value: '',
          rules: 'required',
          errorMessage: '',
        },

        stateModeration: {
          value: '',
          rules: 'required',
          errorMessage: '',
        },
      },

      isValidForm: false,
    };
  };

  setFiledForm = (key: string, value: any) => {
    const { fields } = this?.form;

    if (fields[key]) {
      fields[key].value = value;
    }
  };

  clearData = () => {
    this.initForm();
  };

  submit = () => {};

  clear = () => {
    this.initForm();
  };
}
