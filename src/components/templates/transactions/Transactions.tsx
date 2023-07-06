import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Heading,
  useColorModeValue,
  SimpleGrid,
  Box,
} from '@chakra-ui/react';
import { useEvmWalletTransactions } from '@moralisweb3/next';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { getEllipsisTxt } from 'utils/format';
import { useNetwork } from 'wagmi';
import { Bar, Line, Radar, Doughnut } from 'react-chartjs-2';

const Transactions = () => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');
  const { data } = useSession();
  const { chain } = useNetwork();
  const { data: transactions } = useEvmWalletTransactions({
    address: data?.user?.address,
    chain: chain?.id,
  });

  useEffect(() => console.log('transactions: ', transactions), [transactions]);

  return (
    <>
      <Heading size="lg" marginBottom={6}>
        Transactions
      </Heading>

      {/* shar */}

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
        {transactions?.length ? (
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
                  {transactions?.map((tx, key) => (
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
    </>
  );
};

export default Transactions;
