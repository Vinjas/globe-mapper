import { COLORS } from '@/styles/colors';
import { Modal } from 'antd';
import styled from 'styled-components';

interface StatesModalProps {
  countryName: string;
  states: { name: string }[];
  isOpen: boolean;
  onCancel: () => void;
}

const StyledStatesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const StyledStateTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 9rem;
  padding: 0.5rem;
  color: ${COLORS.bluePrimary};
  border: 1px solid ${COLORS.bluePrimary};
  border-radius: 10px;
`;

export function StatesModal({
  countryName,
  states,
  isOpen,
  onCancel
}: StatesModalProps): JSX.Element {
  return (
    <Modal open={isOpen} footer={null} centered onCancel={onCancel}>
      <h1>{`(${states.length}) ${countryName} States:`}</h1>

      <StyledStatesList>
        {states.map((state: { name: string }) => (
          <StyledStateTag key={state.name}>{state.name}</StyledStateTag>
        ))}
      </StyledStatesList>
    </Modal>
  );
}
