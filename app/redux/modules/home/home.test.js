import { getRepoData, makeRepoReducer } from './home'

describe('>>> (fn) -- Tests makeRepoReducer Function', () => {
  it('Checks if function returns right elements', () => {
    const result = makeRepoReducer({
      name : 'Dummy',
      path : '/abc/def'
    })
    const expectedActions = [
      'GET_DUMMY_DETAILS',
      'GET_DUMMY_DETAILS_SUCCESS',
      'GET_DUMMY_DETAILS_FAILURE'
    ]

    const { actions, reducer, fetchDummyDetails } = result

    expect(reducer).toBeDefined()
    expect(fetchDummyDetails).toBeDefined()
    expect(Object.keys(actions)).toEqual(expect.arrayContaining(expectedActions))
  })
})

describe('>>> (fn) -- Tests getRepoData Function', () => {
  it('Checks if getRepoData returns right elements', () => {
    const dummyData = {
      open_issues_count : 32,
      forks_count       : 323,
      stargazers_count  : 222,
      name              : 'test',
      description       : 'some description',
      stargazers_url    : 'https://api.github.com/repos/facebook/react/stargazers',
      pulls_url         : 'https://api.github.com/repos/facebook/react/pulls{/number}',
    }
    const result = getRepoData(dummyData)
    const expected = {
      openIssues  : 32,
      forks       : 323,
      stars       : 222,
      name        : 'test',
      description : 'some description',
      starURL     : 'repos/facebook/react/stargazers',
      prCounts    : 'https://api.github.com/repos/facebook/react/pulls'
    }

    expect(result).toEqual(expected)
  })
})

