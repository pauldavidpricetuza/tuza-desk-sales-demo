import { useState } from 'react'
import { Text } from '#ui/Text/Text'
import { Button } from '#ui/Button/Button'
import { TextInput } from '#ui/TextInput/TextInput'
import { overlay, modalContainer, titleBar, formBody, footer } from './CreateMerchantModal.css'

type Props = {
  onClose: () => void
  onSubmit?: (data: { contactName: string; email: string; phone: string }) => void
}

export function CreateMerchantModal({ onClose, onSubmit }: Props) {
  const [contactName, setContactName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  function handleSubmit() {
    onSubmit?.({ contactName, email, phone })
    onClose()
  }

  return (
    <div className={overlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={modalContainer}>
        <div className={titleBar}>
          <Text as="h2" font="heading2" id="modal-title">
            Create merchant
          </Text>
        </div>

        <div className={formBody}>
          <TextInput
            label="CONTACT NAME"
            value={contactName}
            onChange={setContactName}
            showStatusIcon={contactName.length > 0}
            fullWidth
          />
          <TextInput
            label="EMAIL ADDRESS"
            type="email"
            value={email}
            onChange={setEmail}
            showStatusIcon={email.length > 0}
            fullWidth
          />
          <TextInput
            label="PHONE NUMBER"
            type="tel"
            value={phone}
            onChange={setPhone}
            showStatusIcon={phone.length > 0}
            fullWidth
          />
        </div>

        <div className={footer}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Start application
          </Button>
        </div>
      </div>
    </div>
  )
}
