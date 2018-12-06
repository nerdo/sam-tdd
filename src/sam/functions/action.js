export function action (op, model, processor, args) {
  const proposal = processor.getProposal(op, model, args)
  processor.digest(op, model, proposal)
  model.getSupervisor().process(model)
}
