import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStoresHook } from '@hooks';
import { AutocompleteAtom, ButtonAtom, ChipAtom, IAutocompleteAtomOption } from '@atoms';
import { PreloaderFullContentMol, MediaCardMol } from '@molecules';
import styles from './ContentBaseView.module.scss';
import { PageContentLayout } from '@layouts';
import { BreadcrumbsAtom } from '../../_atoms/Breadcrumbs/Breadcrumbs';
import { SortOutlined as SortOutlinedIcon } from '@mui/icons-material';
import { ContentBaseFilter } from './components/ContentBaseFilter/ContentBaseFilter';
import classNames from 'classnames';
import { FixedSizeGrid as VirtualGridList } from 'react-window';
import uuid from 'react-uuid';

export const ContentBaseView = observer(() => {
  const { contentBaseStore, contentBaseFiltersStore } = useStoresHook();

  useEffect(() => {
    contentBaseStore.getBaseContentMD();

    addMedia();

    return contentBaseStore.clearData;
  }, []);

  const addMedia = () => {
    const media: any[] = [];

    for (let i = 0; i < 10; i++) {
      const id = uuid();
      let name = `Супер пупер видео с текстом Супер пупер видео с текстом Супер пупер видео с текстом Супер пупер видео с текстом`;
      let duration = `3:00`;
      let type = 'text';
      let img = 'https://p2.zoon.ru/2/2/6305ca568ee721d4880de2eb_633294449494c7.34084722.jpg';
      let size = '30мб.';
      let hashTags = '#fgdf, #fgdf, #fgd234f, #fgdf, #fg32fddf, #fgdsf, #SDSAf, #234';
      let screens = '1920x800, 1200x400, 1200x400, 1200x400, 1200x400, 1200x400, 1200x400';
      let change = 'Васильев Д.К • 01.12.2025 10:30';
      let moderation = 'Васильев Д.К • Главный редактор • 14.12.2025 02:30';
      let moderationStatus = 'success';

      if (i % 3 === 0) {
        type = 'online';
        name = 'Видео с онлайн типом';
        duration = '01:34';
        img = 'https://avatars.mds.yandex.net/get-altay/1633254/2a0000016898775e9a43e55f7abbb2af0037/XXXL';
        size = '2мб.';
        moderationStatus = 'cancel'
      } else if (i % 2 === 0) {
        type = 'offline';
        name = 'Видео с офлайн типом';
        duration = '00:22';
        size = '100мб.';
        moderationStatus = 'return'
        img =
          'https://yandex-images.clstorage.net/fWe5y6131/9e62cd33/WAXpAFoNr8olqqWnniW8B7yA6_i8hVhHFd3oH5JrPqOFq0s6DpN3KXBUQiWd5cDVnGLOcaUxqGe43XyAlmgYU5wxbWDbfMs75Lu1wk_gfEeOR_h6vkbq5bOvetw36j-GIOuK2t72Bt1kMpTkuTFQFjxxbkHCR-8ingjZVdOOjwT79bhlb_lNObVIp5ZNM6yEv6VbCY7XizXxzdscFqm_0OO5S6hd5UCMFQAX4erB8LYNUX9jo2ZPwz2J-4bzvI_VSxeoV5xb7JgmGnUWfHP-Ju2E6krNxejkAC1ajvRZDOHx2Ooof6fg7iTz51JIEwCEbWFcs3AFXZJf-po1000s95g2mRc_eX0L1vim9q0gbXd81Fp4DoQo5sOuC363OY6iQYoZa7wk0C5mMAVRu5GxFN-B7sHC5E2SzXipF5Kt3bdpdZt27OvcyzYrFpe9Qx6lHPc5Oh8neKYgTenfhqnMMUOJCEnc9PBMFHGnsJhik8dvIV5RMofdIk87e3cj3v9kWwYrlp65rNkUGueUf5F9l2y1KhuPF0iXgy1YvlYLDjJQOPh4LDXALNZz1jA78mA1XHFto_JUvcBsagkUY10MVIgVqmTOG824dSv2Fl-DvMR85lp5jkZ7VaFNSRxUK8wC0OlIaD6V0m5WIeQTuwNApu4zrHFgZn1yTbjpVbON_kULpnllrbhvyWfIhSbPMD2EvoV6eN53qgRRjdlsxGt_sYH4OWm-N3CMZ_BFsPsyYlV-YH6zE3QNMk0p69dzv120-BfpVQ7pfEsmO9fEnDO9VR1m-Hmu9Ei24387DAZ7HqOzmzkbv_ewr8dx9JHrgVL3PmIOctC33UBv2Tp0ox0vJRhly1Veqa24FfrFx93y3LS-1FvIjXSYRAG9inxV-7_BQcrpSF2mAA71InYAKoATRz5D3bGyZHwyzhtaFQDcDOVId_mkrMj_aAYbxvbeQb1Gn-UKiE7FalcTzlp_pHmtw';
      }

      media.push({
        id: id,
        name: name,
        duration: duration,
        img: img,
        type: type,
        size: size,
        hashTags,
        screens,
        change,
        moderation,
        moderationStatus
      });
    }

    contentBaseStore.setMediaData(media);
  };

  const setLocation = (_option: IAutocompleteAtomOption | null) => {
    //const id = option.value;
    /* stocksStore.clearKeyword();
    navigate(`/stocks/operations/${id}`);*/
  };

  const handleClickOnFieldSort = (e: any) => {
    const { id } = e.currentTarget.dataset;

    contentBaseStore.setFieldSort(id);
  };

  const Cell = ({ columnIndex, rowIndex, style }) => (
    <div style={style}>
      Item {rowIndex},{columnIndex}
    </div>
  );

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
                <ButtonAtom label={'Добавить'} theme={'Success'} />
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

                <div className={styles.mediaContainer}>
                  {/* <VirtualGridList
                    columnCount={1000}
                    columnWidth={100}
                    height={150}
                    rowCount={1000}
                    rowHeight={35}
                    width={300}
                  >
                    {Cell}
                  </VirtualGridList>*/}

                  {contentBaseStore.mediaData.map((item) => {
                    return <MediaCardMol key={item.id} data={item} />;
                  })}
                </div>
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
