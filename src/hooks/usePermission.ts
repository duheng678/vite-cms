import useLoginStore from '@/store/login/login'

export default function (pageName: string, permission: string) {
  const power = `system:${pageName}:${permission}`
  const permissions = useLoginStore().permissions
  return !!permissions.find((item) => item === power)
}
