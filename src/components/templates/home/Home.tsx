/* eslint-disable etc/no-commented-out-code */
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  useColorModeValue,
  SimpleGrid,
  Box,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useEvmWalletTransactions } from '@moralisweb3/next';
import { Input, Button, Grid, GridItem, Wrap, WrapItem, Tag, Text } from '@chakra-ui/react';
// import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { getEllipsisTxt } from 'utils/format';
import { useNetwork } from 'wagmi';
import { Bar, Line, Radar, Doughnut } from 'react-chartjs-2';
import { toUpper } from 'ramda';

const Home = () => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');
  const { chain } = useNetwork();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [address, setAddress] = useState('');
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  // const [transactions, setTransactions] = useState([]);
  const [wallet, setWallet] = useState({
    address: '0xd4e4078ca3495DE5B1d4dB434BEbc5a986197782',
    color: randomColor,
    tags: [],
    transactions: [],
  });

  const { data } = useEvmWalletTransactions({
    address: wallet.address,
    // address: '0xd4e4078ca3495DE5B1d4dB434BEbc5a986197782',
    // address: data?.user?.address,
    chain: chain?.id,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  // useEffect(() => console.log('transactions: ', transactions), [transactions]);

  // @ts-ignore
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSearchClick = async () => {
    if (!wallet || !address) {
      return;
    }

    // @ts-ignore
    setWallet({ ...wallet, address, color: Math.floor(Math.random() * 16777215).toString(16), transactions: data });

    console.log('🚀 ~ file: Transactions.tsx:44 ~ handleSearchClick ~ wallet:', wallet);
  };

  const labels = ['stable coin holder', 'erc-20 flipper', 'Early adopter', 'liquidity Farmer'];

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center">
        <div className="relative flex flex-row w-full mx-auto">
          <Input
            p="6"
            rounded="full"
            placeholder="-- Paste the wallet address here -- "
            value={address}
            onChange={handleAddressChange}
          />
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
            zIndex={40}
            onClick={handleSearchClick}
            disabled={address.length === 0}
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

      {/* NOTE: 大頭貼 */}
      <div>
        <Grid templateColumns="repeat(12, 1fr)" gap={1} my="12">
          <GridItem colSpan={10} h="24">
            <Grid
              templateAreas={`
                  "nav main"
                  "nav footer"`}
              gridTemplateRows={'50px 1fr 30px'}
              gridTemplateColumns={'150px 1fr'}
              h="24"
              gap="1"
              color="blackAlpha.700"
              fontWeight="bold"
            >
              <GridItem pl="2" area={'nav'}>
                <Wrap>
                  <WrapItem>
                    <Box
                      boxSize="100px"
                      objectFit="cover"
                      rounded="md"
                      backgroundColor={`#${wallet.color}`}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text>{wallet.address.slice(2, 8)}</Text>
                    </Box>
                  </WrapItem>
                </Wrap>
              </GridItem>
              <GridItem area={'main'}>
                <Text fontSize="2xl" color="#fff">
                  {wallet.address}
                </Text>
              </GridItem>
              <GridItem area={'footer'}>
                <Box display="flex" flexDirection="row">
                  {labels.map((size) => (
                    <Tag
                      size="sm"
                      key={size}
                      variant="outline"
                      color="#fff"
                      borderRadius="full"
                      border="1px solid #82FCD3"
                      display="inline-block"
                      fontWeight="bold"
                      px="4"
                      py="1"
                      mr="2"
                    >
                      {toUpper(size)}
                    </Tag>
                  ))}
                </Box>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem colSpan={1} h="24">
            <Doughnut
              data={{
                labels: ['Jan'],
                datasets: [
                  {
                    label: 'Transactions',
                    data: [25],
                    backgroundColor: ['#CF9A41'],
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                rotation: -90,
                circumference: 180,
                cutout: '90%',
              }}
            />
          </GridItem>
        </Grid>
      </div>

      <div>
        <SimpleGrid columns={2} spacing={4}>
          <Box>
            <Line
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                  {
                    data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 1],
                    label: 'Transactions',
                    borderColor: '#3e95cd',
                    fill: false,
                  },
                  {
                    data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                    label: 'Gas Used',
                    borderColor: '#8e5ea2',
                    fill: false,
                  },
                ],
              }}
            />
          </Box>
          <Box>
            <Bar
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                  {
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    borderWidth: 1,
                    backgroundColor: ['rgba(255, 159, 64, 0.2)'],
                  },
                  {
                    label: '# of Votes',
                    data: [13, 20, 4, 6, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                    borderWidth: 1,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  },
                ],
              }}
            />
          </Box>
          <Box>
            <Radar
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                datasets: [
                  {
                    label: 'Transactions',
                    data: [65, 59, 90, 81, 56, 55, 40, 30, 20],
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)',
                  },
                  {
                    label: 'Gas Used',
                    data: [28, 48, 40, 19, 96, 27, 100, 50, 10],
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)',
                  },
                ],
              }}
            />
          </Box>
          <Box>
            <Doughnut
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                datasets: [
                  {
                    label: 'Transactions',
                    data: [65, 59, 90, 81, 56, 55, 40, 30, 20],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 205, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(201, 203, 207, 0.2)',
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 205, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                    ],
                  },
                ],
              }}
            />
          </Box>
        </SimpleGrid>
        {wallet.transactions?.length ? (
          <Box border="2px" borderColor={hoverTrColor} borderRadius="xl" padding="24px 18px">
            <TableContainer w={'full'}>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Hash</Th>
                    <Th>From</Th>
                    <Th>To</Th>
                    <Th>Gas used</Th>
                    <Th>Date</Th>
                    <Th isNumeric>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {wallet.transactions?.map((tx, key) => (
                    <Tr key={key} _hover={{ bgColor: hoverTrColor }} cursor="pointer">
                      <Td>{getEllipsisTxt(tx?.hash)}</Td>
                      <Td>{getEllipsisTxt(tx?.from.checksum)}</Td>
                      <Td>{getEllipsisTxt(tx?.to?.checksum)}</Td>
                      <Td>{tx.gasUsed.toString()}</Td>
                      <Td>{new Date(tx.blockTimestamp).toLocaleDateString()}</Td>
                      <Td isNumeric>{tx.receiptStatus}</Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Hash</Th>
                    <Th>From</Th>
                    <Th>To</Th>
                    <Th>Gas used</Th>
                    <Th>Date</Th>
                    <Th isNumeric>Status</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Box>Looks Like you do not have any transactions</Box>
        )}
      </div>
      <Box>
        <Heading size="lg" marginBottom={6}>
          NFTs
        </Heading>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="#000" border="1px solid #82FCD3" rounded="2xl">
          <ModalHeader fontWeight="bold">Import Users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="sm">Import from a CSV file</Text>
            <Box>
              <div
                {...getRootProps({
                  className:
                    'dropzone flex justify-center items-center h-[140px] border border-2 border-dashed my-6 rounded-md cursor-pointer',
                })}
              >
                <input {...getInputProps()} />
                <p>
                  <span>Drop .csv file here or click to upload</span>
                </p>
              </div>
            </Box>
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
    </>
  );
};

export default Home;
