import { observer } from 'mobx-react-lite';
import { FilterComp } from '@components';
import { useStoresHook } from '@hooks';
import {
  RangeSliderAtom,
  SelectAtom,
  SwitchAtom,
  MultiSelectChip,
  AutocompleteAtom,
  IAutocompleteAtomOption,
  RadioButtonsGroupAtom,
  IAutocompleteMultiAtomOption,
  AutocompleteMultiAtom,
  DatePickerRangeAtom,
} from '@atoms';
import styles from './ContentBaseFilter.module.scss';
import { useEffect } from 'react';

export const ContentBaseFilter = observer(() => {
  const { contentBaseFiltersStore } = useStoresHook();

  useEffect(() => {
    return () => {
      contentBaseFiltersStore.clearData();
    };
  }, []);

  const { isValidForm, fields } = contentBaseFiltersStore?.form;

  const handleChangeStartPeriodTime = (values: number[]) => {
    contentBaseFiltersStore.setFiledForm('periodTime', values);
  };

  const handleChangeScreen = (value: any) => {
    contentBaseFiltersStore.setFiledForm('screen', value);
  };

  const handleChangeType = (value: string | number) => {
    contentBaseFiltersStore.setFiledForm('typeContent', value);
  };

  const handleChangeStateModeration = (value: string | number) => {
    contentBaseFiltersStore.setFiledForm('stateModeration', value);
  };

  const handleChangeBroadcastStatus = (value: boolean) => {
    contentBaseFiltersStore.setFiledForm('broadcastStatus', value);
  };

  const handleChangeUser = (option: IAutocompleteAtomOption | null) => {
    contentBaseFiltersStore.setUser(option);
  };

  const handleChangeRangeDate = (date: any) => {
    contentBaseFiltersStore.setFiledForm('rangeDate', date);
  };

  const handleChangeHashTagsOptions = (options: IAutocompleteMultiAtomOption[]) => {
    contentBaseFiltersStore.setFiledForm('hashTags', options);
  };

  return (
    <div className={styles.contentBaseFilter}>
      <FilterComp onSubmit={contentBaseFiltersStore.submit} onClear={contentBaseFiltersStore.clear}>
        <div className={styles.filterContentContainer}>
          <div className={styles.inputContainer}>
            <AutocompleteAtom
              label={'Автор последних изменений'}
              options={contentBaseFiltersStore.userList}
              inputValue={contentBaseFiltersStore.usersKeyword}
              onInputValueChange={contentBaseFiltersStore.setUsersKeyword}
              onGetOptions={contentBaseFiltersStore.getOptionsUsers}
              onChange={handleChangeUser}
              value={contentBaseFiltersStore.userSelectedOption}
              clearOnBlur
            />

            {/*   <SelectAtom
              label={'Тип контента'}
              value={fields.typeContent.value}
              onChange={handleChangeType}
              options={contentBaseFiltersStore.typeOptionList}
              isEmpty
            />

            <SelectAtom
              label={'Состояние модерации'}
              value={fields.stateModeration.value}
              onChange={handleChangeStateModeration}
              options={contentBaseFiltersStore.stateModerationOptionList}
              isEmpty
            />*/}
          </div>

          <div className={styles.inputContainer}>
            <AutocompleteMultiAtom
              label={'Хештеги'}
              options={contentBaseFiltersStore.hashTagList}
              inputValue={contentBaseFiltersStore.hashTagKeyword}
              onInputValueChange={contentBaseFiltersStore.setHashTagKeyword}
              onGetOptions={contentBaseFiltersStore.getOptionsHashTags}
              onChange={handleChangeHashTagsOptions}
              value={fields.hashTags.value}
            />
          </div>

          <div className={styles.inputContainer}>
            <MultiSelectChip
              value={fields.screen.value}
              label={'Разрешение'}
              onChange={handleChangeScreen}
              options={contentBaseFiltersStore.screenOptionList}
            />
          </div>

          <div className={styles.dateContainer}>
            <div>{'Дата изменения: '}</div>

            <DatePickerRangeAtom onChange={handleChangeRangeDate} rangeValue={fields.rangeDate.value} />
          </div>

          <div className={styles.radioGroupContainer}>
            <div>{'Тип контента:'}</div>

            <RadioButtonsGroupAtom
              radioOptions={contentBaseFiltersStore.typeOptionList}
              value={fields.typeContent.value}
              onChange={handleChangeType}
            />
          </div>

          <div className={styles.radioGroupContainer}>
            <div>{'Состояние модерации:'}</div>

            <RadioButtonsGroupAtom
              radioOptions={contentBaseFiltersStore.stateModerationOptionList}
              value={fields.stateModeration.value}
              onChange={handleChangeStateModeration}
            />
          </div>

          <div className={styles.inputContainer}>
            <SwitchAtom
              label={'Состояние трансляции'}
              checked={fields.broadcastStatus.value}
              onChange={handleChangeBroadcastStatus}
            />
          </div>

          <div className={styles.sliderContainer}>
            <div className={styles.title}>{'Длительность (в секундах): '}</div>

            <RangeSliderAtom
              values={fields.periodTime.value}
              maxValue={180}
              minValue={0}
              step={10}
              onChangeValue={handleChangeStartPeriodTime}
            />
          </div>
        </div>
      </FilterComp>
    </div>
  );
});
