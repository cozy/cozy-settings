import React from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/Media'

import styles from 'styles/fields.styl'
import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'

export const ActivationConfirmation = ({ images, twoFactor }) => {
  const { t } = useI18n()
  return (
    <>
      <img
        alt={t('ProfileView.twofa.title.activate')}
        src={images.twoFaModalBanner}
      />
      <h3>{t('ProfileView.twofa.modal.protect')}</h3>
      <ReactMarkdownWrapper
        source={t('ProfileView.twofa.modal.change', {
          link: 'https://support.cozy.io/article/114-doubleauthentification'
        })}
      />
      <div>
        <Media>
          <Img>
            <img
              width="80px"
              className="u-mr-1-half"
              alt="{t('ProfileView.twofa.modal.secu_title')}"
              src={images.twoFaModalSecu}
            />
          </Img>
          <div>
            <Typography variant="h5">
              {t('ProfileView.twofa.modal.secu_title')}
            </Typography>
            <p>{t('ProfileView.twofa.modal.secu_description')}</p>
          </div>
        </Media>
        <Media>
          <Img>
            <img
              width="80px"
              className="u-mr-1-half"
              alt="{t('ProfileView.twofa.modal.protect_title')}"
              src={images.twoFaModalProtect}
            />
          </Img>
          <Bd>
            <Typography variant="h5">
              {t('ProfileView.twofa.modal.protect_title')}
            </Typography>
            <p>{t('ProfileView.twofa.modal.protect_description')}</p>
          </Bd>
        </Media>
      </div>
      {twoFactor.error && (
        <p className={styles['coz-form-errors']}>{t(twoFactor.error)}</p>
      )}
    </>
  )
}

export default ActivationConfirmation
