/* eslint-disable no-inline-comments */
import { useState, useEffect, useRef } from 'react';
import { Heading, Box, Flex } from '@chakra-ui/react';
import { useEvmWalletTransactions } from '@moralisweb3/next';
import { useDropzone } from 'react-dropzone';
import {
  Input,
  Button,
  Grid,
  GridItem,
  Tag,
  Text,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Image,
  ModalCloseButton,
} from '@chakra-ui/react';
import { CheckIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useSession } from 'next-auth/react';
import { useNetwork } from 'wagmi';
import { Doughnut } from 'react-chartjs-2';
import { toUpper } from 'ramda';

// const usersData = [
// {
//   name: '0x121r124124r1',
//   amount: 1,
//   attribute_type: 'NFT Trader',
//   icon: 'https://zapper.xyz/images/lists/Q3VyYXRlZFVzZXJMaXN0LTE3MQ==.png',
//   tags: ['Sweeper', 'Airdrop Pro'],
// },
// ];

const Transactions = () => {
  const { data } = useSession();
  const { chain } = useNetwork();

  const chartRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isOpen: isPaywallOpen, onOpen: onPaywallOpen, onClose: onPaywallClose } = useDisclosure();
  // @ts-ignore
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploaded, setIsUploaded] = useState(false);

  const onDrop = (newFiles: File[]) => {
    console.log('🚀 ~ file: Home.tsx:38 ~ onDrop ~ files:', files);
    setFiles(newFiles);
    setIsUploaded(true);
  };

  const { getRootProps, getInputProps } = useDropzone({
    // Note how this callback is never invoked if drop occurs on the inner dropzone
    onDrop,
    accept: {
      'text/csv': [],
    },
  });
  const { data: transactions } = useEvmWalletTransactions({
    address: data?.user?.address,
    chain: chain?.id,
  });
  const userTags = ['Sweeper', 'Airdrop Pro'];

  useEffect(() => console.log('transactions: ', transactions), [transactions]);

  const handleUsersImport = () => {
    const formData = new FormData();
    formData.append('csvfile', files[0]);

    fetch('https://web3-wallet-dashboard-api-q67p7dk34q-uc.a.run.app/api/v1/wallets/csv/', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((resData) => {
        const { users: newUsers } = resData.data;
        setUsers(newUsers);
        onClose();
      })
      .catch((e) => {
        console.error('error', e);
        /*發生錯誤時要做的事情*/
      })
      .finally(() => {
        setIsUploaded(false);
      });
  };

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center">
        <div className="relative flex flex-row w-full mx-auto">
          <Input p="6" rounded="full" placeholder="-- Paste the wallet address here -- " />
          <Button
            right="0"
            position="absolute"
            colorScheme="purple"
            bg="#6235D0"
            rounded="full"
            color="#fff"
            fontSize="xs"
            fontWeight="bold"
            p="6"
            px="12"
          >
            Try Now
          </Button>
        </div>
        <Text color="#fff" mx="4">
          |
        </Text>
        <div className="flex justify-center my-4">
          <Button
            colorScheme="gray"
            bg="white"
            rounded="full"
            color="#000"
            fontWeight="bold"
            fontSize="xs"
            onClick={onOpen}
          >
            Uploading list of users
          </Button>
        </div>
      </Box>

      <Grid templateColumns="repeat(4, 1fr)" gap={1}>
        <GridItem colSpan={3} h="12">
          <Text fontSize="xl">{`${users.length} Users`}</Text>
        </GridItem>
      </Grid>

      <Grid templateColumns="repeat(3, 1fr)" gap={1} mb="12">
        <GridItem pl="2">
          <Card maxW="sm">
            <CardBody>
              <Stack mt="1" spacing="3">
                <Text>Meta Info</Text>
                <Heading size="md">Total Assets</Heading>
                <Text>$815,321</Text>

                <Grid templateColumns="repeat(4, 1fr)" gap={1} my="12">
                  <GridItem pl="2" display="flex" mb="4">
                    {['sm', 'md', 'lg'].map((size) => (
                      <Tag size="md" mr="2" key={size} variant="solid" bg="#334E68" borderRadius="md">
                        {size}
                      </Tag>
                    ))}
                  </GridItem>
                </Grid>
              </Stack>
              <Box>
                <Doughnut
                  ref={chartRef}
                  data={{
                    labels: ['BTC', 'ETH', 'USDT', 'Others'],
                    datasets: [
                      {
                        label: 'Transactions',
                        data: [65, 59, 90, 81],
                        backgroundColor: ['#F7A23B', '#00C7F2', '#0FCA7A', '#FBC62F'],
                      },
                    ],
                  }}
                  options={{
                    cutout: '75%',
                    elements: {
                      arc: {
                        borderWidth: 0,
                      },
                    },
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          usePointStyle: true,
                          boxWidth: 6,
                        },
                      },
                    },
                  }}
                />
              </Box>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                variant="solid"
                color="#fff"
                colorScheme="purple"
                rounded="md"
                w="100%"
                bg="#6235D0"
                onClick={onPaywallOpen}
              >
                {`Learn More >`}
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem pl="2">{/* Chart */}</GridItem>
        <GridItem pl="2">{/* Chart */}</GridItem>
      </Grid>

      {users.length > 0 ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={1} my="12" bg="#191C1F" p="4">
          {users.map((user) => (
            <Grid templateColumns="repeat(4, 1fr)" gap={1} mb="4" mr="4" bg="#282C30" p="4" rounded="lg" shadow="lg">
              <GridItem colSpan={3}>
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="#fff">
                    {user?.attribute_type || 'No name'}
                  </Text>
                </Box>
                <Box>
                  <Text color="#9EA5AB">{`${user.amount} accounts`}</Text>
                </Box>
              </GridItem>
              <GridItem colSpan={1} display="flex" justifyContent="end">
                {/* <Wrap>
                  <WrapItem>
                    <Box
                      boxSize="100px"
                      objectFit="cover"
                      rounded="md"
                      backgroundColor={`#6235D0`}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text>{user.name.slice(2, 8)}</Text>
                    </Box>
                  </WrapItem>
                </Wrap> */}
                <Image boxSize="64px" objectFit="cover" rounded="md" src={user.icon} />
              </GridItem>
              <GridItem
                colSpan={4}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                overflow="hidden"
                pt="2"
              >
                <Box display="flex">
                  {userTags.map((tag) => (
                    <Tag
                      size="sm"
                      key={tag}
                      variant="outline"
                      color="#fff"
                      borderRadius="full"
                      border="1px solid #82FCD3"
                      display="flex"
                      fontWeight="bold"
                      px="4"
                      py="1"
                      mr="2"
                      cursor="default"
                      alignItems="center"
                      style={{
                        flex: '1 0 auto',
                      }}
                    >
                      {toUpper(tag)}
                    </Tag>
                  ))}
                </Box>
                <Button backgroundColor="#82FCD3" rounded="full" color="#000" size="sm" onClick={onPaywallOpen}>
                  <ChevronRightIcon boxSize={6} />
                </Button>
              </GridItem>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Flex bg="#191C1F" p="4" rounded="md">
          <Text mx="auto">No Data</Text>
        </Flex>
      )}

      {/* NOTE: Import users */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="#000" border="1px solid #82FCD3" rounded="2xl">
          <ModalHeader fontWeight="bold">Import Users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="sm">Import from a CSV file</Text>
            {isUploaded ? (
              <Box display="flex" flexDirection="column" justifyContent="center" my="4">
                <CheckIcon mx="auto" my="2" />
                <Text mb="2">The file is uploaded</Text>
              </Box>
            ) : (
              <Box display="flex" justifyContent="center">
                <div
                  {...getRootProps({
                    className:
                      'dropzone flex justify-center items-center w-full h-[140px] border border-2 border-dashed my-6 rounded-md cursor-pointer',
                  })}
                >
                  <input {...getInputProps()} />
                  <p>
                    <span>Drop .csv file here or click to upload</span>
                  </p>
                </div>
              </Box>
            )}
            <Box display="flex" justifyContent="center">
              <Button
                right="0"
                colorScheme="purple"
                bg="#6235D0"
                rounded="full"
                color="#fff"
                fontSize="xs"
                fontWeight="bold"
                p="1"
                px="12"
                zIndex={40}
                onClick={handleUsersImport}
              >
                Import Users
              </Button>
            </Box>
            <Box display="flex" justifyContent="center" my="4">
              <Text fontSize="sm" textDecoration="underline" mb="6" color="#82FCD3">
                Download the CSV template
              </Text>
            </Box>
          </ModalBody>

          {/* <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter> */}
        </ModalContent>
      </Modal>
      {/* NOTE: Paywall */}
      <Modal isOpen={isPaywallOpen} onClose={onPaywallClose} size="xl">
        <ModalOverlay />
        <ModalContent backgroundColor="#000" border="1px solid #82FCD3" rounded="2xl">
          <ModalHeader fontWeight="bold"></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Heading mx="auto">Plans & Prices</Heading>
              <Text mx="auto">Choose the best fitting plan and grow your brand & business today!</Text>
              <Box>
                <div>Paywall</div>
                <div>Work In Progress ...</div>
              </Box>
            </Box>
          </ModalBody>

          {/* <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Transactions;
