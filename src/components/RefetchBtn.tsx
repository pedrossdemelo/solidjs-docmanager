export default function RefetchBtn(props: { refetch: () => void }) {
  return (
    <button class="btn btn-info fixed bottom-5 right-5" onClick={props.refetch}>
      Refetch
    </button>
  );
}
