import React from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/Media'

import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'

export const ActivationConfirmation = ({ images, twoFactor }) => {
  const { t } = useI18n()
  return (
    <>
      <img
        width={480}
        height={116}
        alt={t('ProfileView.twofa.title.activate')}
        src={images.twoFaModalBanner}
      />
      <Typography variant="h5" className="u-ta-center u-mv-1-half">
        {t('ProfileView.twofa.modal.protect')}
      </Typography>
      <ReactMarkdownWrapper
        source={t('ProfileView.twofa.modal.change', {
          link: 'https://support.cozy.io/article/114-doubleauthentification'
        })}
      />
      <div className="u-mt-1">
        <Media>
          <Img>
            <img
              width={80}
              height={100}
              className="u-mr-1-half"
              alt={t('ProfileView.twofa.modal.secu_title')}
              src={images.twoFaModalSecu}
            />
          </Img>
          <div>
            <Typography variant="h5">
              {t('ProfileView.twofa.modal.secu_title')}
            </Typography>
            <Typography variant="body1">
              {t('ProfileView.twofa.modal.secu_description')}
            </Typography>
          </div>
        </Media>
        <Media>
          <Img>
            <img
              width={80}
              height={100}
              className="u-mr-1-half"
              alt={t('ProfileView.twofa.modal.protect_title')}
              src={images.twoFaModalProtect}
            />
          </Img>
          <Bd>
            <Typography variant="h5" gutterBottom>
              {t('ProfileView.twofa.modal.protect_title')}
            </Typography>
            <Typography variant="body1">
              {t('ProfileView.twofa.modal.protect_description')}
            </Typography>
          </Bd>
        </Media>
      </div>
      {twoFactor.error && (
        <Typography variant="body1" className="u-error">
          {t(twoFactor.error)}
        </Typography>
      )}
    </>
  )
}

export default ActivationConfirmation
