import { rootStoreType } from '../../../../RootStore';
import { makeAutoObservable } from 'mobx';
import { IAutocompleteAtomOption } from '@atoms';
import { IOptions } from '../../../../../_atoms/Select/Select.interfaces';

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

  screenOptionList: IOptions[] = [
    { value: 1, label: '1920x800' },
    { value: 2, label: '1200x400' },
    { value: 3, label: '120x40' },
    { value: 4, label: '1203x420' },
    { value: 5, label: '5200x300' },
    { value: 6, label: '600x400' },
    { value: 7, label: '110x800' },
    { value: 9, label: '330x800' },
    { value: 10, label: '220x800' },
    { value: 8, label: '1450x800' },
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

  usersKeyword = '';

  userList: IAutocompleteAtomOption[] = [];
  userSelectedOption: IAutocompleteAtomOption | null = null;

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

        rangeDate: {
          value: [null, null],
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
          value: [],
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

  getOptionsUsers = () => {
    /*if (this.usersKeyword && this.usersKeyword.trim().length >= 2) {*/
    const params = {
      name: this.usersKeyword,
    };

    this.userList = [
      { id: 1, label: 'Петров. В.А' },
      { id: 2, label: 'Тимуров. В.А' },
      { id: 3, label: 'Пупкин. В.А' },
    ];

    /*  getProductsAPI(params)
        .then((response) => {
          this.productsOptionList = response.elements.map((item) => {
            return { value: item.id, title: item.name, active: !!item.active };
          });
        })
        .catch((e) => snackbarStore.parseError(e));*/
    /*} else {
      this.userList = [];
    }*/
  };

  setUsersKeyword = (value: string) => {
    this.usersKeyword = value;
  };

  setUser = (option: IAutocompleteAtomOption | null) => {
    this.userSelectedOption = option;

    this.setFiledForm('userId', option ? option.value : null);
  };

  clearData = () => {
    this.initForm();
  };

  submit = () => {};

  clear = () => {
    this.initForm();
    this.userSelectedOption = null;
  };
}
