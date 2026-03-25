import { Card } from '@sanity/ui';
import styled from 'styled-components';

import CertifikEduIcon from '../icon.svg';

export const ContainerCard = styled(Card)`
  width: 100%;
  margin: 0 auto;
  vertical-align: middle;
  padding: 4px;
  aspect-ratio: 1/1;
  background-color: #ff790d;
  color: '#fff';
`;

export default function ProductionIcon() {
  return (
    <ContainerCard>
      <img src={CertifikEduIcon} alt="CertifikEDU" />
    </ContainerCard>
  );
}
