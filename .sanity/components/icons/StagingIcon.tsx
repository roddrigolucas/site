import { Card } from '@sanity/ui';
import { Code2Icon } from 'lucide-react';
import styled from 'styled-components';

export const ContainerCard = styled(Card)`
  width: 100%;
  padding: 4px;
  aspect-ratio: 1/1;
  background-color: #8b5cf6;
  color: '#fff';
`;

export default function StagingIcon() {
  return (
    <ContainerCard>
      <Code2Icon style={{ height: '16px', width: '16px' }} width="16" height="16" />
    </ContainerCard>
  );
}
