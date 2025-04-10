import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStoresHook } from '@hooks';
import { AutocompleteAtom, ButtonAtom, ChipAtom } from '@atoms';
import { PreloaderFullContentMol } from '@molecules';
import styles from './ContentBaseView.module.scss';
import { PageContentLayout } from '@layouts';
import { BreadcrumbsAtom } from '../../_atoms/Breadcrumbs/Breadcrumbs';
import { AddOutlined as AddOutlinedIcon } from '@mui/icons-material';
import { ContentBaseFilter } from './components/ContentBaseFilter/ContentBaseFilter';

export const ContentBaseView = observer(() => {
  const { contentBaseStore, contentBaseFiltersStore } = useStoresHook();

  useEffect(() => {
    contentBaseStore.getBaseContentMD();

    return () => {
      contentBaseFiltersStore.clearData();
    };
  }, []);

  return (
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
                onInputChange={contentBaseStore.getMediaSearchList}
              />

              <ContentBaseFilter />
            </div>

            <div className={styles.btnContainer}>
              <ButtonAtom label={'Добавить'} theme={'Success'} endIcon={(<AddOutlinedIcon />) as React.ReactElement} />
            </div>
          </div>
        </div>
      }
      Content={
        <div className={styles.contentBaseView}>
          {contentBaseStore.contentBaseData ? (
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
                    label={`${item.name} ${item.count}`}
                  />
                );
              })}
            </div>
          ) : (
            <PreloaderFullContentMol />
          )}
        </div>
      }
    />
  );
});
