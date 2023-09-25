/**
 *
 * TransactionPreview
 *
 */
import { Box } from 'grommet/es6/components/Box'
import { Grid } from 'grommet/es6/components/Grid'
import { ResponsiveContext } from 'grommet/es6/contexts/ResponsiveContext'
import React, { memo, useContext } from 'react'

import { AmountFormatter } from '../AmountFormatter'
import { ResponsiveGridRow, ResponsiveGridAddressRow } from '../ResponsiveGridRow'
import { TransactionPreview as Preview } from 'app/state/transaction/types'
import { useTranslation } from 'react-i18next'
import { TransactionTypeFormatter } from '../TransactionTypeFormatter'

interface Props {
  preview: Preview
  walletAddress: string
  chainContext: string
}

export const TransactionPreview = memo((props: Props) => {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)
  const { preview, walletAddress, chainContext } = props

  return (
    <Grid columns={size !== 'small' ? ['auto', 'auto'] : ['auto']} gap={{ column: 'small', row: 'xsmall' }}>
      <ResponsiveGridRow
        label={t('transaction.preview.type', 'Type')}
        value={<TransactionTypeFormatter type={preview.transaction.type} />}
      />
      <ResponsiveGridAddressRow label={t('transaction.preview.from', 'From')} value={walletAddress} />
      {preview.transaction.type === 'transfer' && (
        <ResponsiveGridAddressRow label={t('transaction.preview.to', 'To')} value={preview.transaction.to} />
      )}
      {(preview.transaction.type === 'addEscrow' || preview.transaction.type === 'reclaimEscrow') && (
        <ResponsiveGridAddressRow
          label={t('transaction.preview.validator', 'Validator')}
          value={preview.transaction.validator}
        />
      )}
      <ResponsiveGridRow
        label={t('transaction.preview.amount', 'Amount')}
        value={<AmountFormatter amount={preview.transaction.amount} />}
      />
      {preview.transaction.type === 'reclaimEscrow' && (
        <ResponsiveGridRow
          label={t('transaction.preview.shares', 'Gigashares')}
          value={<AmountFormatter amount={preview.transaction.shares} hideTicker />}
        />
      )}
      <ResponsiveGridRow
        label={t('transaction.preview.fee', 'Fee')}
        value={<AmountFormatter amount={preview.fee!} />}
      />
      <ResponsiveGridRow
        label={t('transaction.preview.gas', 'Gas')}
        value={<AmountFormatter amount={preview.gas!} hideTicker />}
      />
      <ResponsiveGridRow
        label={t('transaction.preview.genesisHash', 'Genesis hash')}
        value={
          <Box
            border={{
              color: 'background-contrast-2',
              side: 'left',
              size: '3px',
            }}
            background={{
              color: 'background-contrast',
              opacity: 0.04,
            }}
            width="75%"
            pad="xsmall"
          >
            {chainContext}
          </Box>
        }
      />
    </Grid>
  )
})
