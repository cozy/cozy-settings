import React from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/deprecated/Media'

import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
import twoFaModalBanner from 'assets/images/double_authent_prez_banner.svg'
import twoFaModalProtect from 'assets/images/protect_data_point.svg'
import twoFaModalSecu from 'assets/images/niv_secu_point.svg'

export const ActivationConfirmation = ({ error }) => {
  const { t } = useI18n()
  return (
    <>
      <div className="u-flex">
        <img
          className="u-w-100 u-mh-auto"
          alt={t('ProfileView.twofa.title.activate')}
          src={twoFaModalBanner}
          style={{ maxWidth: 480 }}
        />
      </div>
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
              src={twoFaModalSecu}
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
        <Media className="u-mt-1-half">
          <Img>
            <img
              width={80}
              height={100}
              className="u-mr-1-half"
              alt={t('ProfileView.twofa.modal.protect_title')}
              src={twoFaModalProtect}
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
      {error && (
        <Typography variant="body1" className="u-error">
          {t(error)}
        </Typography>
      )}
    </>
  )
}

export default ActivationConfirmation
