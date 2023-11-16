import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes';

const statusMap: Record<Status, { label: string, color: 'red' | 'blue' | 'green' }> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In Progress', color: 'blue' },
    CLOSED: {label: 'Completed', color: 'green'}
}

interface Props{
    status: Status;
}

const IssueBadge = ({status}:Props) => {
  return (
      <Badge color={statusMap[status].color}>{ statusMap[status].label}</Badge>
  );
}

export default IssueBadge