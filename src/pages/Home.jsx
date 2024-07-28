import { Container, ExchangeForm, ExchangeInfo, Heading, Loader, Section } from 'components';
import { useSelector } from 'react-redux';
import { selectError, selectExchangeInfo, selectLoading } from 'reduxState/selectors';

const Home = () => {
  const isError = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const exchandeInfo = useSelector(selectExchangeInfo);
  console.log(exchandeInfo);

  return (
    <Section>
      <Container>
        <ExchangeForm />
        {!isError && !exchandeInfo && <Heading info title="What currencies do you want to exchange?🙂" />}
        {exchandeInfo && <ExchangeInfo {...exchandeInfo} />}
        {isLoading && <Loader />}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}
      </Container>

    </Section>
  );
};

export default Home;
