import { rootStoreType } from '../../../../RootStore';
import { makeAutoObservable } from 'mobx';
import { IAutocompleteAtomOption, IAutocompleteMultiAtomOption, IChipAtomValue } from '@atoms';
import { IOptions } from '../../../../../_atoms/Select/Select.interfaces';
import { format } from 'date-fns';

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

interface IFilterChip {
  key: string;
  label: string;
  value: string;
}

interface INTERFACE_FILTER_DEFAULT_VALUE {
  periodTime: number[];
  rangeDate: [
    {
      startDate: any;
      endDate: any;
      key: 'selection';
    },
  ];
  userId: string;
  typeContent: string;
  screen: number[];
  broadcastStatus: boolean;
  hashTags: IAutocompleteMultiAtomOption[];
  stateModeration: string;
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

  hashCommonTagList: IOptions[] = [
    { value: 1, label: 'хеш-1' },
    { value: 2, label: 'хеш-2' },
    { value: 3, label: 'хеш-3' },
    { value: 4, label: 'хеш-4' },
    { value: 5, label: 'хеш-5' },
    { value: 6, label: 'хеш-6' },
    { value: 7, label: 'хеш-7' },
    { value: 8, label: 'хеш-8' },
    { value: 9, label: 'хеш-9' },
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

  hashTagKeyword = '';
  hashTagList: IAutocompleteMultiAtomOption[] = [];

  filterChipsList: IFilterChip[] = [];

  FILTER_DEFAULT_VALUE: INTERFACE_FILTER_DEFAULT_VALUE = {
    periodTime: [0, 180],
    rangeDate: [
      {
        startDate: new Date(),
        endDate: null,
        key: 'selection',
      },
    ],
    userId: '',
    typeContent: '',
    screen: [],
    broadcastStatus: false,
    hashTags: [], //тип IAutocompleteMultiAtomOption[]
    stateModeration: '',
  };

  constructor(rootStore: rootStoreType) {
    this.rootStore = rootStore;

    this.initForm();

    makeAutoObservable(this, { rootStore: false, FILTER_DEFAULT_VALUE: false });
  }

  clearFilterForKey = (key: IChipAtomValue) => {
    this.form.fields[key].value = this.FILTER_DEFAULT_VALUE[key];

    if (key === 'userId') {
      this.userSelectedOption = null;
    }

    this.setFilterChipsData();
  };

  initForm = () => {
    this.form = {
      fields: {
        periodTime: {
          value: this.FILTER_DEFAULT_VALUE.periodTime,
          rules: 'required',
          errorMessage: '',
        },

        rangeDate: {
          value: this.FILTER_DEFAULT_VALUE.rangeDate,
          rules: 'required',
          errorMessage: '',
        },

        userId: {
          value: this.FILTER_DEFAULT_VALUE.userId,
          rules: 'required',
          errorMessage: '',
        },

        typeContent: {
          value: this.FILTER_DEFAULT_VALUE.typeContent,
          rules: 'required',
          errorMessage: '',
        },

        screen: {
          value: this.FILTER_DEFAULT_VALUE.screen,
          rules: 'required',
          errorMessage: '',
        },

        broadcastStatus: {
          value: this.FILTER_DEFAULT_VALUE.broadcastStatus,
          rules: 'required',
          errorMessage: '',
        },

        hashTags: {
          value: this.FILTER_DEFAULT_VALUE.hashTags,
          rules: 'required',
          errorMessage: '',
        },

        stateModeration: {
          value: this.FILTER_DEFAULT_VALUE.stateModeration,
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
      { value: 1, label: 'Петров. В.А' },
      { value: 2, label: 'Тимуров. В.А' },
      { value: 3, label: 'Пупкин. В.А' },
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

  setHashTagKeyword = (keyword: string) => {
    this.hashTagKeyword = keyword;
  };

  getOptionsHashTags = () => {
    /*if (this.hashTagKeyword && this.hashTagKeyword.trim().length >= 2) {*/
    const params = {
      name: this.hashTagKeyword,
    };

    this.hashTagList = [
      { value: 1, label: 'хеш-1' },
      { value: 2, label: 'хеш-2' },
      { value: 3, label: 'хеш-3' },
      { value: 4, label: 'хеш-4' },
      { value: 5, label: 'хеш-5' },
      { value: 6, label: 'хеш-6' },
      { value: 7, label: 'хеш-7' },
      { value: 8, label: 'хеш-8' },
      { value: 9, label: 'хеш-9' },
    ];
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

  submit = () => {
    this.setFilterChipsData();
  };

  clear = () => {
    this.initForm();
    this.userSelectedOption = null;
    this.filterChipsList = [];
  };

  setFilterChipsData = () => {
    const { fields } = this.form;

    const _filterChipsList: IFilterChip[] = [];

    Object.entries(fields).forEach(([key, item]) => {
      switch (key) {
        case 'periodTime': {
          if (
            item.value[0] !== this.FILTER_DEFAULT_VALUE[key][0] ||
            item.value[1] !== this.FILTER_DEFAULT_VALUE[key][1]
          )
            _filterChipsList.push({
              key: key,
              label: 'Длительность',
              value: `от ${item.value[0]} до ${item.value[1]}`,
            });
          break;
        }
        case 'rangeDate': {
          if (
            item.value[0].startDate !== this.FILTER_DEFAULT_VALUE[key][0].startDate ||
            item.value[0].endDate !== this.FILTER_DEFAULT_VALUE[key][0].endDate
          )
            _filterChipsList.push({
              key: key,
              label: 'Дата',
              value: `с ${format(item.value[0].startDate as any, 'dd.MM.yyyy')} по ${format(
                item.value[0].endDate as any,
                'dd.MM.yyyy',
              )}`,
            });
          break;
        }

        case 'userId': {
          if (item.value !== this.FILTER_DEFAULT_VALUE[key]) {
            const user = this.userList.find((userItem) => userItem.value === item.value);

            if (user) {
              _filterChipsList.push({
                key: key,
                label: 'Пользователь',
                value: user.label,
              });
            }
          }
          break;
        }

        case 'typeContent': {
          if (item.value !== this.FILTER_DEFAULT_VALUE[key]) {
            const type = this.typeOptionList.find((typeItem) => typeItem.value == +item.value);

            if (type) {
              _filterChipsList.push({
                key: key,
                label: 'Тип контента',
                value: type.label,
              });
            }
          }
          break;
        }

        case 'stateModeration': {
          if (item.value !== this.FILTER_DEFAULT_VALUE[key]) {
            const stateModeration = this.stateModerationOptionList.find(
              (stateModerationItem) => stateModerationItem.value === +item.value,
            );

            if (stateModeration) {
              _filterChipsList.push({
                key: key,
                label: 'Состояние модерации',
                value: stateModeration.label,
              });
            }
          }
          break;
        }

        case 'broadcastStatus': {
          if (item.value !== this.FILTER_DEFAULT_VALUE[key]) {
            _filterChipsList.push({
              key: key,
              label: 'Состояние трансляции',
              value: 'Активно',
            });
          }
          break;
        }

        case 'screen': {
          if (item.value.length > 0) {
            const str = this.screenOptionList
              .filter((screenItem) => item.value.includes(screenItem.value))
              .map((screenFilteredItem) => screenFilteredItem.label);

            _filterChipsList.push({
              key: key,
              label: 'Разрешение',
              value: str.length <= 3 ? str.join(';') : `${str.length} шт.`,
            });
          }
          break;
        }

        case 'hashTags': {
          if (item.value.length > 0) {
            const valueList = item.value.map((hashItem) => hashItem.value);

            const str = this.hashCommonTagList
              .filter((hashTagItem) => valueList.includes(hashTagItem.value))
              .map((hashTagFilteredItem) => hashTagFilteredItem.label);

            _filterChipsList.push({
              key: key,
              label: 'Хештеги',
              value: str.length <= 3 ? str.join(';') : `${str.length} шт.`,
            });
          }
          break;
        }
        default: {
          break;
        }
      }
    });

    this.filterChipsList = _filterChipsList;
  };
}
