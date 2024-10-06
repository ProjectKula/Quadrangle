const engineeringBranches: { [key: string]: string } = {
    'AIML': 'Artificial Intelligence and Machine Learning',
    'AS': 'Aerospace Engineering',
    'BT': 'Biotechnology',
    'CD': 'Computer Science (Data Science)',
    'CH': 'Chemical Engineering',
    'CI': 'Computer Science (Artificial Intelligence)',
    'CS': 'Computer Science',
    'CV': 'Civil Engineering',
    'CY': 'Computer Science (Cybersecurity)',
    'EC': 'Electronics and Communication Engineering',
    'EE': 'Electrical Engineering',
    'EI': 'Electronics and Instrumentation Engineering',
    'ET': 'Electronics and Telecommunication Engineering',
    'IM': 'Industrial Engineering and Management',
    'IS': 'Information Science',
    'ME': 'Mechanical Engineering'
};

export function getBranchName(branchCode: string): string {
    return engineeringBranches[branchCode] || 'Unknown Branch';
}
