import { PageWrapper } from '~/components/PageWrapper';
import { createServerSupabaseClient } from '~/services/supabase-server';

import RealtimeProducts from './realtime';

export default async function Products() {
  const supabase = createServerSupabaseClient();

  const { data } = await supabase.from('products').select();

  const showEmptyState = !data?.length;
  const hasData = !!data?.length;

  // show empty state
  const emptyState = () => <div>Empty state</div>;

  return (
    <PageWrapper
      title="Produtos"
      subtitle={`${data?.length} produtos cadastrados`}
    >
      <div className="pt-4">
        {showEmptyState && emptyState()}
        {hasData && <RealtimeProducts productsFromServer={data} />}
      </div>
    </PageWrapper>
  );
}
