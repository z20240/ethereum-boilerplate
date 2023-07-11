/* eslint-disable no-inline-comments */
import { Heading, Box } from '@chakra-ui/react';
import { useEvmWalletTransactions } from '@moralisweb3/next';
import {
  Input,
  Button,
  Grid,
  GridItem,
  Image,
  HStack,
  Tag,
  Text,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Divider,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { useNetwork } from 'wagmi';
import { Doughnut } from 'react-chartjs-2';

const Transactions = () => {
  const { data } = useSession();
  const { chain } = useNetwork();

  const chartRef = useRef(null);

  const { data: transactions } = useEvmWalletTransactions({
    address: data?.user?.address,
    chain: chain?.id,
  });

  const usersData = [
    {
      name: 'Conservative investor',
      amount: 15,
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      name: 'Conservative investor',
      amount: 15,
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      name: 'Conservative investor',
      amount: 15,
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      name: 'Conservative investor',
      amount: 15,
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      name: 'Conservative investor',
      amount: 15,
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      name: 'Conservative investor',
      amount: 15,
      avatar: 'https://bit.ly/dan-abramov',
    },
    {
      name: 'Conservative investor',
      amount: 15,
      avatar: 'https://bit.ly/dan-abramov',
    },
  ];

  useEffect(() => console.log('transactions: ', transactions), [transactions]);

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        Transactions
      </Heading>

      <Box display="flex" flexDirection="row" alignItems="center" my="8">
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
          <Button colorScheme="gray" bg="white" rounded="full" color="#000" fontWeight="bold" fontSize="xs">
            Uploading list of users
          </Button>
        </div>
      </Box>

      <Grid templateColumns="repeat(4, 1fr)" gap={1}>
        <GridItem colSpan={3} h="12">
          <Text fontSize="xl">{`226 Users`}</Text>
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
              <Button variant="solid" color="#fff" colorScheme="purple" rounded="md" w="100%" bg="#6235D0">
                {`Learn More >`}
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem pl="2">{/* Chart */}</GridItem>
        <GridItem pl="2">{/* Chart */}</GridItem>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={1} my="12" bg="#191C1F" p="4">
        {usersData.map((user) => (
          <Grid templateColumns="repeat(4, 1fr)" gap={1} mb="4" mr="4" bg="#282C30" p="4" rounded="lg" shadow="lg">
            <GridItem colSpan={3}>
              <Box>
                <Text fontSize="lg" fontWeight="bold" color="#fff">
                  {user.name}
                </Text>
              </Box>
              <Box>
                <Text color="#9EA5AB">{`${user.amount} accounts`}</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={1} display="flex" justifyContent="end">
              <Image boxSize="64px" objectFit="cover" rounded="md" src={user.avatar} />
            </GridItem>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Transactions;
