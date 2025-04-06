import { observer } from 'mobx-react-lite';
import { Suspense, useEffect } from 'react';
import { useStoresHook } from '../../hooks/useStoresHook';
import { ChipAtom } from '@atoms';
import { PreloaderFullContentMol } from '@molecules';
import styles from './ContentBaseView.module.scss';

export const ContentBaseView = observer(() => {
  const { contentBaseStore } = useStoresHook();

  useEffect(() => {
    contentBaseStore.getBadeContentMD();
  }, []);

  return (
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
  );
});
