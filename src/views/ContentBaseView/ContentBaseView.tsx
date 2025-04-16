import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStoresHook } from '@hooks';
import { AutocompleteAtom, ButtonAtom, ChipAtom, IAutocompleteAtomOption } from '@atoms';
import { PreloaderFullContentMol } from '@molecules';
import styles from './ContentBaseView.module.scss';
import { PageContentLayout } from '@layouts';
import { BreadcrumbsAtom } from '../../_atoms/Breadcrumbs/Breadcrumbs';
import { AddOutlined as AddOutlinedIcon, SortOutlined as SortOutlinedIcon } from '@mui/icons-material';
import { ContentBaseFilter } from './components/ContentBaseFilter/ContentBaseFilter';
import classNames from 'classnames';

export const ContentBaseView = observer(() => {
  const { contentBaseStore, contentBaseFiltersStore } = useStoresHook();

  useEffect(() => {
    contentBaseStore.getBaseContentMD();

    return contentBaseStore.clearData;
  }, []);

  const setLocation = (_option: IAutocompleteAtomOption | null) => {
    //const id = option.value;
    /* stocksStore.clearKeyword();
    navigate(`/stocks/operations/${id}`);*/
  };

  const handleClickOnFieldSort = (e: any) => {
    const { id } = e.currentTarget.dataset;

    contentBaseStore.setFieldSort(id);
  };

  return (
    <div className={styles.contentBaseView}>
      <PageContentLayout
        Header={
          <div className={styles.header}>
            <BreadcrumbsAtom data={contentBaseStore.breadcrumbsList} />

            <div className={styles.operationBlock}>
              <div className={styles.filtersContainer}>
                <AutocompleteAtom
                  label={'Поиск'}
                  options={contentBaseStore.mediaSearchList}
                  className={styles.searchInput}
                  isSearchIcon
                  inputValue={contentBaseStore.mediaCardNameKeyword}
                  onInputValueChange={contentBaseStore.setMediaCardNameKeyword}
                  onSearchInputValue={contentBaseStore.getMediaSearchList} // нужен другой метод, для выозова карточке с учетом введенного значения
                  onChange={setLocation}
                  onGetOptions={contentBaseStore.getMediaSearchList}
                />

                <ContentBaseFilter />
              </div>

              <div className={styles.btnContainer}>
                <ButtonAtom
                  label={'Добавить'}
                  theme={'Success'}
                  endIcon={(<AddOutlinedIcon />) as React.ReactElement}
                />
              </div>
            </div>
          </div>
        }
        Content={
          <div className={styles.content}>
            {contentBaseStore.contentBaseData ? (
              <>
                <div className={styles.actionContainer}>
                  <div className={styles.filterContainer}>
                    <div className={styles.fastFiltersContainer}>
                      {contentBaseStore.contentBaseData.fastFilters.map((item) => {
                        const isSelected = item.id == contentBaseStore.selectedFastFilterId;

                        return (
                          <ChipAtom
                            key={item.id}
                            isSelected={isSelected}
                            theme={'Outlined'}
                            onClick={contentBaseStore.setSelectedFastFilterId}
                            value={item.id}
                            label={
                              <>
                                <span className={styles.nameChip}>{`${item.name}:`}</span> <span>{item.count}</span>
                              </>
                            }
                          />
                        );
                      })}
                    </div>

                    {!!contentBaseFiltersStore.filterChipsList.length && (
                      <div className={styles.filtersChipContainer}>
                        {contentBaseFiltersStore.filterChipsList.map((item) => {
                          return (
                            <ChipAtom
                              key={item.key}
                              theme={'Secondary'}
                              size={'small'}
                              value={item.key}
                              label={
                                <>
                                  <span className={styles.label}>{`${item.label}:`}</span> <span>{item.value}</span>
                                </>
                              }
                              onDelete={contentBaseFiltersStore.clearFilterForKey}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className={styles.sortFieldsContainer}>
                    {contentBaseStore.sortFieldsList.map((item) => {
                      const isSelected = contentBaseStore.sortData.key === item.key;
                      const isDesc = contentBaseStore.sortData.value === 'desc';

                      return (
                        <div key={item.key} className={classNames(styles.sortField, isSelected ? styles.selected : '')}>
                          <span className={styles.title} data-id={item.key} onClick={handleClickOnFieldSort}>
                            {item.title}
                          </span>

                          <SortOutlinedIcon className={classNames(styles.icon, isDesc ? styles.desc : '')} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.mediaContainer}></div>
              </>
            ) : (
              <PreloaderFullContentMol />
            )}
          </div>
        }
      />
    </div>
  );
});
