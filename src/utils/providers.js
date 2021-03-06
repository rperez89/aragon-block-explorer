const providers = net => {
  const network = {
    rinkeby: 'https://rinkeby.infura.io/v3/740fbf77bc954d57b28be4adfd15aac4',
    mainnet: 'https://mainnet.infura.io/v3/740fbf77bc954d57b28be4adfd15aac4',
  }
  return (
    network[net] ||
    'https://mainnet.infura.io/v3/740fbf77bc954d57b28be4adfd15aac4'
  )
}

export default providers
