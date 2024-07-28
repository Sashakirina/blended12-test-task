import { Wave } from 'react-animated-text';

import { Container, Heading, Loader, RatesList, Section } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { selectBaseCurrency, selectError, selectLoading, selectRates } from 'reduxState/selectors';
import { useEffect } from 'react';
import { fetchLatestSymbols } from 'reduxState/currency/operations';

const Rates = () => {
  const isError = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const rates = useSelector(selectRates);
  const baseCurrency = useSelector(selectBaseCurrency)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLatestSymbols(baseCurrency));
  }, [baseCurrency, dispatch]);

  console.log(rates);

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
        {rates.length > 0 && <RatesList rates={rates} />}
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
