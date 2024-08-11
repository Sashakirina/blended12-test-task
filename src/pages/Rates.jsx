import { Wave } from 'react-animated-text';

import {
  Container,
  Filter,
  Heading,
  Loader,
  RatesList,
  Section,
} from 'components';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBaseCurrency,
  selectError,
  selectFilteredRates,
  selectLoading,
  selectRates,
} from 'reduxState/selectors';
import { useEffect } from 'react';
import { fetchLatestSymbols } from 'reduxState/currency/operations';

const Rates = () => {
  const isError = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const rates = useSelector(selectRates);
  const baseCurrency = useSelector(selectBaseCurrency);
  const filteredRates = useSelector(selectFilteredRates);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLatestSymbols(baseCurrency));
  }, [baseCurrency, dispatch]);

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        {rates.length > 0 && <Filter />}
        {filteredRates.length > 0 && <RatesList rates={filteredRates} />}
        {isLoading && <Loader />}

        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;
