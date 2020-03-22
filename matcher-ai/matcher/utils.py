import pgeocode

def filter_and_score_jobs(df_employee, df_jobs):
    """
    Function that filters possible jobs for one employee by hard criteria (student, german speaking, drivers-license),
    scores jobs by soft-criteria (working hours, start date, distance)
    returns a df with all possible jobs for this employee and the respective scores
    """
    df_employee_job_matching = pd.merge(df_jobs, df_employee, how='left', left_index=True, right_index=True).ffill()

    hard_skills_col_dict = {'german_speaking': 'german_required', 'drivers_license':'drivers_license_required',
                            'student':'student_job'}
    for skill, requirement in hard_skills_col_dict.items():
        if df_employee[skill]==False:
            df_employee_job_matching = df_employee_job_matching.loc[df_employee_job_matching[requirement]==False]

     # filter if working hours > max working hours o employee
     df_employee_job_matching = df_employee_job_matching.loc[df_employee_job_matching['working_hours'] <= df_employee_job_matching['working_hours']]

    # TODO filter jobs that start too late
    # calculate distance between zip codes

     dist = pgeocode.GeoDistance('DE')
     df_employee_job_matching['distance'] = dist.query_postal_code(df_employee_job_matching['employee_zip_code'],
                                                df_employee_job_matching['job_zip_code'])

    return df_employee_job_matching.sort_values('distance')

def score_jobs(df_jobs_filtered):

df_employee = pd.DataFrame([['a'], [True], [True], [False], [80796], [40]], columns = ['employee_id', 'german_speaking',
                                                                                       'drivers_license', 'student',
                                                                                       'employee_zip_code',
                                                                                       'max_working_hours'])
df_job = pd.DataFrame([['e', 'f', 'g'], [True, False, True], [True, True, True], [False, False, True],
                                                                                      [80796, 80333, 20149],
                                                                                      [40, 40, 40]],
                                                                                        columns = ['job_id',
                                                                                                   'german_required',
                                                                                       'drivers_license', 'student',
                                                                                       'job_zip_code',
                                                                                       'working_hours'] )