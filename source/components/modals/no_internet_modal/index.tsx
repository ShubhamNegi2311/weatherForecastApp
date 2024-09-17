import React from 'react';
import {Modal, Text} from 'react-native';

const NoInternetModal = () => {
  return (
    <Modal>
      <Text>NoInternetModal</Text>
    </Modal>
  );
};

export const NoInternetModalView = React.memo(NoInternetModal);
