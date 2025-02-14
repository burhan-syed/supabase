import { Button, Modal } from '@supabase/ui'
import { isEmpty } from 'lodash'
import { FC, useState } from 'react'
import SqlEditor from 'components/to-be-cleaned/SqlEditor'
import { PolicyForReview } from './Policies.types'

interface Props {
  policy: PolicyForReview
  onSelectBack: () => void
  onSelectSave: () => void
}

const PolicyReview: FC<Props> = ({
  policy = {},
  onSelectBack = () => {},
  onSelectSave = () => {},
}) => {
  const [isSaving, setIsSaving] = useState(false)
  const onSavePolicy = () => {
    setIsSaving(true)
    onSelectSave()
  }

  let formattedSQLStatement = policy.statement || ''

  return (
    <>
      <Modal.Content>
        <div className="space-y-6 py-8">
          <div className="flex items-center justify-between space-y-8">
            <div className="flex flex-col">
              <p className="text-scale-1100 text-sm">
                This is the SQL statement that will be used to create your policy.
              </p>
            </div>
          </div>
          <div className="space-y-4 overflow-y-auto" style={{ maxHeight: '25rem' }}>
            {isEmpty(policy) ? (
              <div className="my-10 flex items-center justify-center space-x-2 opacity-50">
                <p className="text-scale-1100 text-base">
                  There are no changes made to this policy
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <span>{policy.description}</span>
                <div className="h-40">
                  <SqlEditor readOnly defaultValue={formattedSQLStatement} />
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal.Content>
      <div className="dark:border-dark flex w-full items-center justify-end gap-2 border-t px-6 py-4">
        <Button type="default" onClick={onSelectBack}>
          Back to edit
        </Button>
        <Button type="primary" disabled={isEmpty(policy)} onClick={onSavePolicy} loading={isSaving}>
          Save policy
        </Button>
      </div>
    </>
  )
}

export default PolicyReview
