import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";

import type { publicTeamInfo } from "../../../server/types";

export type SelectTeamModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onSelected: (teamId: string) => void;
	teams: publicTeamInfo[];
};

export const SelectTeamModal = ({ isOpen, onClose }: SelectTeamModalProps) => {
	return (
		<Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior="inside">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Wähle ein Team aus, mit dem du beitreten möchtest</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit
					arcu sed erat
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
